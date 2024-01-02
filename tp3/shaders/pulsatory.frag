varying vec3 vColor;
varying vec3 instanceColor;

uniform float time;

void main(){
    //TODO: fix color
    //gl_FragColor = vec4(instanceColor, 1.0);
    gl_FragColor = vec4(vColor, 1.0);
}