uniform vec3 iResolution;
uniform float iTime;
uniform sampler2D iChannel0;

// ----------------------------------------------------
// 단일 패스용 사운드 스무딩 함수 (가우시안 11탭 근사)
// ----------------------------------------------------
float sampleSoundSmooth(sampler2D snd, float u, float v)
{
  const float TEX_W = 1024.0;
  float px = 1.0 / TEX_W;

  // 가우시안 계수 (대칭, center + 5쌍)
  float w[6];
  w[0] = 0.227027; // center
  w[1] = 0.194594;
  w[2] = 0.121621;
  w[3] = 0.054054;
  w[4] = 0.016216;
  w[5] = 0.003000;

  // 중앙
  float sum = texture(snd, vec2(clamp(u, 0.0, 1.0), v)).x * w[0];

  // 좌우 페어 샘플링
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

  // 범위 스케일
  float scaledR = r * 0.4; // <- 오타 'A' 제거

  // ===== 사운드 스무딩 =====
  float sound = sampleSoundSmooth(iChannel0, scaledR, 0.25);
  sound = clamp(pow(sound, 0.4), 0.0, 1.0);

  // === 이동 방향 세팅 ===
  // ★ 안→밖으로 보이게 하려면 '시간 항에 - 부호'
  const float HUE_SPEED   = 0.15; // 색 스크롤 속도
  const float RING_SPEED  = 1.0;  // 링 이동 속도

  // 색상: 무지개 그라데이션 (시간 스크롤 부호를 -로)
  float hue = fract(scaledR + sound * 0.2 - iTime * HUE_SPEED); // ★
  vec3 color = vec3(
  0.5 + 0.5 * sin(6.2831 * hue + 0.0),
  0.5 + 0.5 * sin(6.2831 * hue + 2.0),
  0.5 + 0.5 * sin(6.2831 * hue + 4.0)
  );

  // 중앙 글로우
  float ringMask = smoothstep(0.5, 0.0, scaledR);
  float glow = ringMask * sound * 1.5;

  // 링 펄스: 시간 항 부호를 -로 바꿔 안→밖 이동
  float pulse = sin(20.0 * scaledR - iTime * RING_SPEED + sound * 5.0) * 0.5 + 1.0; // ★
  pulse *= ringMask * sound;

  vec3 finalColor = color * (glow + pulse);

  // 외곽 알파 컷
  float alpha = scaledR < 1.0 ? 1.0 : 0.0;
  fragColor = vec4(finalColor, alpha);
}


void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
//  gl_FragColor = vec4(cos(iTime), 0.0, 1.0, 1.0);
}