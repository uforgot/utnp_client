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

  float w[6];
  w[0]=0.227027; w[1]=0.194594; w[2]=0.121621;
  w[3]=0.054054; w[4]=0.016216; w[5]=0.003000;

  float sum = texture(snd, vec2(clamp(u,0.0,1.0), v)).x * w[0];
  for(int i=1;i<=5;i++){
    float offs = px*float(i);
    float sL = texture(snd, vec2(clamp(u-offs,0.0,1.0), v)).x;
    float sR = texture(snd, vec2(clamp(u+offs,0.0,1.0), v)).x;
    sum += (sL+sR)*w[i];
  }
  return sum;
}
// 반지름과 무관한 "하나의" 사운드 레벨(저~중역 평균)
float soundLevelScalar(){
  // 여러 대역을 고정 위치에서 샘플 → 반지름(r)과 독립
  float s0 = sampleSoundSmooth(iChannel0, 0.03, 0.25);
  float s1 = sampleSoundSmooth(iChannel0, 0.08, 0.25);
  float s2 = sampleSoundSmooth(iChannel0, 0.15, 0.25);
  float s3 = sampleSoundSmooth(iChannel0, 0.28, 0.25);
  float s  = (s0+s1+s2+s3)/4.0;
  // 다이내믹 완화
  return clamp(pow(s, 0.65), 0.0, 1.0);

}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  vec2 h = iResolution.xy * 0.5;
  float r = length((fragCoord.xy - h) / h.y);

  // 범위 스케일
  float scaledR = r * 0.5;

  // ===== 사운드 스무딩 =====
  float sound = sampleSoundSmooth(iChannel0, scaledR, 0.25);
  sound = clamp(pow(sound, 0.4), 0.0, 1.0);

  // === 이동 방향 세팅 ===
  // ★ 안→밖으로 보이게 하려면 '시간 항에 - 부호'
  const float HUE_SPEED   = 0.2; // 색 스크롤 속도
  const float RING_SPEED  = 10.0;  // 링 이동 속도

  // 색상: 무지개 그라데이션 (시간 스크롤 부호를 -로)
  float hue = fract(scaledR + sound * 0.3 - iTime * HUE_SPEED); // ★
  vec3 color = vec3(
  0.5 + 0.5 * sin(6.2831 * hue + 0.0),
  0.5 + 0.5 * sin(6.2831 * hue + 2.0),
  0.5 + 0.5 * sin(6.2831 * hue + 4.0)
  );

  // 중앙 글로우
  float ringMask = smoothstep(0.5, 0.0, scaledR);
  float glow = ringMask * sound * 1.5;

  // 링 펄스: 시간 항 부호를 -로 바꿔 안→밖 이동
  float pulse = sin(20.0 * scaledR - iTime * RING_SPEED + sound * 9.0) * 0.5 + 5.0; // ★
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