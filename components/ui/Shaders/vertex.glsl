// A simple vertex shader that passes along the vertex position.
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 2.0);
}
