uniform float uTime;
uniform float uOpacity;
varying vec2 vUv;

void main() {
  vec2 point = vUv - 0.5;
  float radius = length(point);
  float angle = atan(point.y, point.x);

  float ring = exp(-pow(abs(radius - 0.285) * 31.0, 2.0));
  float halo = exp(-pow(abs(radius - 0.285) * 8.0, 2.0)) * 0.22;
  float core = exp(-radius * 8.0) * 0.12;
  float pulse = 0.92 + sin(uTime * 0.65 + angle * 3.0) * 0.08;

  vec3 cyan = vec3(0.25, 0.88, 1.0);
  vec3 magenta = vec3(0.92, 0.28, 0.82);
  vec3 color = mix(cyan, magenta, smoothstep(-0.72, 0.72, point.x + sin(angle + uTime * 0.08) * 0.08));

  float alpha = (ring * 0.32 + halo + core) * pulse * uOpacity;
  gl_FragColor = vec4(color, alpha);
}
