varying vec2 vUv;
varying vec3 vPosition;
varying vec3 dir;
varying vec3 vNormal;

void main() {

  vNormal = normal;

  vec4 modelPosition = modelMatrix * vec4(position, 1.);

  dir = normalize(modelPosition.xyz - cameraPosition);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  vPosition = position;
  vUv = uv;
  gl_Position = projectedPosition;
}