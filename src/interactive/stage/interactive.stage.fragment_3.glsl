uniform vec3 iResolution;
uniform float iTime;
uniform sampler2D iChannel0;

// ===== Audio-smoothed helper (Gaussian 11-tap) =====
float sampleSoundSmooth(sampler2D snd, float u, float v)
{
  const float TEX_W = 1024.0;
  float px = 1.0 / TEX_W;

  float w[6];
  w[0] = 0.227027; // center
  w[1] = 0.194594;
  w[2] = 0.121621;
  w[3] = 0.054054;
  w[4] = 0.016216;
  w[5] = 0.003000;

  float sum = texture(snd, vec2(clamp(u, 0.0, 1.0), v)).x * w[0];
  for (int i = 1; i <= 5; i++) {
    float offs = px * float(i);
    float sL = texture(snd, vec2(clamp(u - offs, 0.0, 1.0), v)).x;
    float sR = texture(snd, vec2(clamp(u + offs, 0.0, 1.0), v)).x;
    sum += (sL + sR) * w[i];
  }
  return sum;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  vec2 h = iResolution.xy * 0.5;
  float r = length((fragCoord.xy - h) / h.y);

  // 반경 스케일
  float scaledR = r * 0.4;

  // ===== 중앙 ↔ 바깥 전이 =====
  const float INNER = 0.20; // 중앙 원 크기
  const float EDGE  = 0.20; // 전이 폭(넓힐수록 부드럽게)

  float coreMask = smoothstep(INNER + EDGE, INNER - EDGE, scaledR);
  float ringMask = 1.0 - coreMask;

  float s = max(0.0, scaledR - (INNER - EDGE));

  // ===== 사운드 =====
  float sound = sampleSoundSmooth(iChannel0, s, 0.25);
  sound = clamp(pow(sound, 0.4), 0.0, 1.0);

  // ===== 팔레트 (무지개, 하지만 덜/천천히 돌게) =====
  const float HUE_TIME   = 0.3; // 시간 속도 ↓ (천천히 회전)
  const float HUE_SPACE  = 0.50;  // 반지름 따라 색 변화 ↓ (덜 돌게)
  const float HUE_AUDIO  = 0.1;  // 오디오 영향 ↓

  float hueRing = fract(HUE_SPACE * s + HUE_AUDIO * sound - iTime * HUE_TIME);
  vec3 ringPalette = vec3(
  0.5 + 0.5 * sin(6.2831 * hueRing + 0.0),
  0.5 + 0.5 * sin(6.2831 * hueRing + 2.0),
  0.5 + 0.5 * sin(6.2831 * hueRing + 4.0)
  );

  float baseSound = sampleSoundSmooth(iChannel0, 0.0, 0.25);
  float hueCore   = fract(HUE_AUDIO * baseSound - iTime * HUE_TIME);
  vec3 corePalette = vec3(
  0.5 + 0.5 * sin(6.2831 * hueCore + 0.0),
  0.5 + 0.5 * sin(6.2831 * hueCore + 2.0),
  0.5 + 0.5 * sin(6.2831 * hueCore + 4.0)
  );

  // ===== 밝기 =====
  const float RING_FREQ  = 10.0;  // 링 간격 ↓
  const float RING_SPEED = 0.5;   // 링 이동 속도 ↓
  float ringFall = smoothstep(0.7, 0.0, s);
  float pulse = sin(RING_FREQ * s - iTime * RING_SPEED + sound * 4.0) * 0.5 + 0.5;
  float ringBright = (0.7 * sound + 0.5 * pulse) * ringFall;

  float coreBright = coreMask;

  // ===== 블렌딩 =====
  vec3 coreLayer = corePalette * coreBright;
  vec3 ringLayer = ringPalette * ringBright * ringMask;

  vec3 finalColor = clamp(coreLayer + ringLayer, 0.0, 1.0);

  float alpha = scaledR < 1.0 ? 1.0 : 0.0;
  fragColor = vec4(finalColor, alpha);
}


void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
//  gl_FragColor = vec4(cos(iTime), 0.0, 1.0, 1.0);
}