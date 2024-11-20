import {
	Clock as e,
	PerspectiveCamera as i,
	Scene as t,
	WebGLRenderer as s,
	SRGBColorSpace as n,
	MathUtils as o,
	Vector2 as r,
	TextureLoader as a,
	Color as c,
	InstancedMesh as v,
	PlaneGeometry as h,
	MeshBasicMaterial as d,
	AdditiveBlending as l,
	Object3D as m,
	Vector3 as p,
} from "three";
import "three/addons/loaders/GLTFLoader.js";
import "three/addons/loaders/DRACOLoader.js";
import { RGBELoader as u } from "three/addons/loaders/RGBELoader.js";

class x {
	#e;
	canvas;
	camera;
	cameraMinAspect;
	cameraMaxAspect;
	cameraFov;
	maxPixelRatio;
	minPixelRatio;
	scene;
	renderer;
	#i;
	size = {
		width: 0,
		height: 0,
		wWidth: 0,
		wHeight: 0,
		ratio: 0,
		pixelRatio: 0,
	};
	render = this.#t;
	onBeforeRender = () => {};
	onAfterRender = () => {};
	onAfterResize = () => {};
	#s = !1;
	#n = !1;
	isDisposed = !1;
	#o;
	#r;
	#a;
	#c = new e();
	#v = { elapsed: 0, delta: 0 };
	#h;
	constructor(e) {
		(this.#e = { ...e }),
			this.#d(),
			this.#l(),
			this.#m(),
			this.resize(),
			this.#p();
	}
	#d() {
		(this.camera = new i()), (this.cameraFov = this.camera.fov);
	}
	#l() {
		this.scene = new t();
	}
	#m() {
		this.#e.canvas
			? (this.canvas = this.#e.canvas)
			: this.#e.id
				? (this.canvas = document.getElementById(this.#e.id))
				: console.error("Three: Missing canvas or id parameter"),
			(this.canvas.style.display = "block");
		const e = {
			canvas: this.canvas,
			powerPreference: "high-performance",
			...(this.#e.rendererOptions ?? {}),
		};
		(this.renderer = new s(e)), (this.renderer.outputColorSpace = n);
	}
	#p() {
		this.#e.size instanceof Object ||
			(window.addEventListener("resize", this.#u.bind(this)),
			"parent" === this.#e.size &&
				((this.#r = new ResizeObserver(this.#u.bind(this))),
				this.#r.observe(this.canvas.parentNode))),
			(this.#o = new IntersectionObserver(this.#x.bind(this), {
				root: null,
				rootMargin: "0px",
				threshold: 0,
			})),
			this.#o.observe(this.canvas),
			document.addEventListener("visibilitychange", this.#f.bind(this));
	}
	#g() {
		window.removeEventListener("resize", this.#u.bind(this)),
			this.#r?.disconnect(),
			this.#o?.disconnect(),
			document.removeEventListener("visibilitychange", this.#f.bind(this));
	}
	#x(e) {
		(this.#s = e[0].isIntersecting), this.#s ? this.#z() : this.#y();
	}
	#f(e) {
		this.#s && (document.hidden ? this.#y() : this.#z());
	}
	#u() {
		this.#a && clearTimeout(this.#a),
			(this.#a = setTimeout(this.resize.bind(this), 100));
	}
	resize() {
		let e, i, rect;
		this.#e.size instanceof Object
			? ((e = this.#e.size.width), (i = this.#e.size.height))
			: "parent" === this.#e.size && this.canvas.parentNode
				? ((rect = this.canvas.parentNode.getBoundingClientRect()),
					(e = Number(rect.width.toFixed(2))),
					(i = Number(rect.height.toFixed(2))))
				: ((e = window.innerWidth), (i = window.innerHeight)),
			(this.size.width = e),
			(this.size.height = i),
			(this.size.ratio = e / i),
			this.#w(),
			this.#R(),
			this.onAfterResize(this.size);
	}
	#w() {
		(this.camera.aspect = this.size.width / this.size.height),
			this.camera.isPerspectiveCamera &&
				this.cameraFov &&
				(this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect
					? this.#C(this.cameraMinAspect)
					: this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect
						? this.#C(this.cameraMaxAspect)
						: (this.camera.fov = this.cameraFov)),
			this.camera.updateProjectionMatrix(),
			this.updateWorldSize();
	}
	#C(e) {
		const i =
			Math.tan(o.degToRad(this.cameraFov / 2)) / (this.camera.aspect / e);
		this.camera.fov = 2 * o.radToDeg(Math.atan(i));
	}
	updateWorldSize() {
		if (this.camera.isPerspectiveCamera) {
			const e = (this.camera.fov * Math.PI) / 180;
			(this.size.wHeight = 2 * Math.tan(e / 2) * this.camera.position.length()),
				(this.size.wWidth = this.size.wHeight * this.camera.aspect);
		} else
			this.camera.isOrthographicCamera &&
				((this.size.wHeight = this.camera.top - this.camera.bottom),
				(this.size.wWidth = this.camera.right - this.camera.left));
	}
	#R() {
		this.renderer.setSize(this.size.width, this.size.height),
			this.#i?.setSize(this.size.width, this.size.height);
		let e = window.devicePixelRatio;
		this.maxPixelRatio && e > this.maxPixelRatio
			? (e = this.maxPixelRatio)
			: this.minPixelRatio &&
				e < this.minPixelRatio &&
				(e = this.minPixelRatio),
			this.renderer.setPixelRatio(e),
			(this.size.pixelRatio = e);
	}
	get postprocessing() {
		return this.#i;
	}
	set postprocessing(e) {
		(this.#i = e), (this.render = e.render);
	}
	#z() {
		if (this.#n) return;
		const e = () => {
			(this.#h = requestAnimationFrame(e)),
				(this.#v.delta = this.#c.getDelta()),
				(this.#v.elapsed += this.#v.delta),
				this.onBeforeRender(this.#v),
				this.render(),
				this.onAfterRender(this.#v);
		};
		(this.#n = !0), this.#c.start(), e();
	}
	#y() {
		this.#n && (cancelAnimationFrame(this.#h), (this.#n = !1), this.#c.stop());
	}
	#t() {
		this.renderer.render(this.scene, this.camera);
	}
	dispose() {
		this.#g(),
			this.#y(),
			this.scene.traverse((e) => {
				e.isMesh &&
					"object" == typeof e.material &&
					(Object.keys(e.material).forEach((i) => {
						const t = e.material[i];
						null !== t &&
							"object" == typeof t &&
							"function" == typeof t.dispose &&
							t.dispose();
					}),
					e.material.dispose(),
					e.geometry.dispose());
			}),
			this.scene.clear(),
			this.renderer.dispose(),
			(this.isDisposed = !0);
	}
}
const f = new Map(),
	g = new r();
let z,
	y,
	w = !1;
function R(e) {
	const i = {
		position: new r(),
		nPosition: new r(),
		hover: !1,
		onEnter() {},
		onMove() {},
		onClick() {},
		onLeave() {},
		...e,
	};
	return (
		(function (e, i) {
			f.has(e) ||
				(f.set(e, i),
				w ||
					(document.body.addEventListener("pointermove", C),
					document.body.addEventListener("pointerleave", M),
					document.body.addEventListener("click", S),
					(w = !0)));
		})(e.domElement, i),
		(i.dispose = () => {
			var i;
			(i = e.domElement),
				f.delete(i),
				0 === f.size &&
					(document.body.removeEventListener("pointermove", C),
					document.body.removeEventListener("pointerleave", M),
					(w = !1));
		}),
		i
	);
}
function C(e) {
	(g.x = e.clientX), (g.y = e.clientY);
	for (const [e, i] of f) {
		const t = e.getBoundingClientRect();
		P(t)
			? (b(i, t), i.hover || ((i.hover = !0), i.onEnter(i)), i.onMove(i))
			: i.hover && ((i.hover = !1), i.onLeave(i));
	}
}
function S(e) {
	(g.x = e.clientX), (g.y = e.clientY);
	for (const [e, i] of f) {
		const t = e.getBoundingClientRect();
		b(i, t), P(t) && i.onClick(i);
	}
}
function M() {
	for (const e of f.values()) e.hover && ((e.hover = !1), e.onLeave(e));
}
function b(e, i) {
	const { position: t, nPosition: s } = e;
	(t.x = g.x - i.left),
		(t.y = g.y - i.top),
		(s.x = (t.x / i.width) * 2 - 1),
		(s.y = (-t.y / i.height) * 2 + 1);
}
function P(e) {
	const { x: i, y: t } = g,
		{ left: s, top: n, width: o, height: r } = e;
	return i >= s && i <= s + o && t >= n && t <= n + r;
}
async function L(e, i) {
	let t;
	return (
		(t = e.endsWith(".hdr")
			? await (function (e, i) {
					y || (y = new u());
					return y.loadAsync(e, i);
				})(e, i)
			: await (function (e, i) {
					z || (z = new a());
					return z.loadAsync(e, i);
				})(e, i)),
		t
	);
}
const { randFloatSpread: A } = o,
	F = { count: 1024, size: 0.5, colors: [0] };
class O extends v {
	constructor(e) {
		const i = { ...F, ...e },
			t = new h(i.size, i.size),
			s = new d({ blending: l, opacity: 0.5, depthWrite: !1 }),
			n = {
				uRatio: { value: new r(1, 1) },
				uBlurLevel: { value: 4 },
				uFocalLength: { value: 1 },
				uFocusDistance: { value: 1 },
				uMinScale: { value: 0.1 },
				uMaxScale: { value: 1.4 },
				uTime: { value: 0 },
				uTimeScale: { value: 1 },
				uNoiseCoordScale: { value: 3 },
				uNoiseDisplacementScale: { value: 0.005 },
			};
		(s.onBeforeCompile = (e) => {
			Object.assign(e.uniforms, n),
				(e.vertexShader =
					"\n        vec4 permute(vec4 x){vec4 xm=mod(x,289.0);return mod(((xm*34.0)+10.0)*xm,289.0);}float psrdnoise(vec3 x,vec3 period,float alpha,out vec3 gradient){\n#ifndef PERLINGRID\nconst mat3 M=mat3(0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0);const mat3 Mi=mat3(-0.5,0.5,0.5,0.5,-0.5,0.5,0.5,0.5,-0.5);\n#endif\nvec3 uvw;\n#ifndef PERLINGRID\nuvw=M*x;\n#else\nuvw=x+dot(x,vec3(1.0/3.0));\n#endif\nvec3 i0=floor(uvw);vec3 f0=fract(uvw);vec3 g_=step(f0.xyx,f0.yzz);vec3 l_=1.0-g_;vec3 g=vec3(l_.z,g_.xy);vec3 l=vec3(l_.xy,g_.z);vec3 o1=min(g,l);vec3 o2=max(g,l);vec3 i1=i0+o1;vec3 i2=i0+o2;vec3 i3=i0+vec3(1.0);vec3 v0,v1,v2,v3;\n#ifndef PERLINGRID\nv0=Mi*i0;v1=Mi*i1;v2=Mi*i2;v3=Mi*i3;\n#else\nv0=i0-dot(i0,vec3(1.0/6.0));v1=i1-dot(i1,vec3(1.0/6.0));v2=i2-dot(i2,vec3(1.0/6.0));v3=i3-dot(i3,vec3(1.0/6.0));\n#endif\nvec3 x0=x-v0;vec3 x1=x-v1;vec3 x2=x-v2;vec3 x3=x-v3;if(any(greaterThan(period,vec3(0.0)))){vec4 vx=vec4(v0.x,v1.x,v2.x,v3.x);vec4 vy=vec4(v0.y,v1.y,v2.y,v3.y);vec4 vz=vec4(v0.z,v1.z,v2.z,v3.z);if(period.x>0.0)vx=mod(vx,period.x);if(period.y>0.0)vy=mod(vy,period.y);if(period.z>0.0)vz=mod(vz,period.z);\n#ifndef PERLINGRID\ni0=M*vec3(vx.x,vy.x,vz.x);i1=M*vec3(vx.y,vy.y,vz.y);i2=M*vec3(vx.z,vy.z,vz.z);i3=M*vec3(vx.w,vy.w,vz.w);\n#else\nv0=vec3(vx.x,vy.x,vz.x);v1=vec3(vx.y,vy.y,vz.y);v2=vec3(vx.z,vy.z,vz.z);v3=vec3(vx.w,vy.w,vz.w);i0=v0+dot(v0,vec3(1.0/3.0));i1=v1+dot(v1,vec3(1.0/3.0));i2=v2+dot(v2,vec3(1.0/3.0));i3=v3+dot(v3,vec3(1.0/3.0));\n#endif\ni0=floor(i0+0.5);i1=floor(i1+0.5);i2=floor(i2+0.5);i3=floor(i3+0.5);}vec4 hash=permute(permute(permute(vec4(i0.z,i1.z,i2.z,i3.z))+vec4(i0.y,i1.y,i2.y,i3.y))+vec4(i0.x,i1.x,i2.x,i3.x));vec4 theta=hash*3.883222077;vec4 sz=hash*-0.006920415+0.996539792;vec4 psi=hash*0.108705628;vec4 Ct=cos(theta);vec4 St=sin(theta);vec4 sz_prime=sqrt(1.0-sz*sz);vec4 gx,gy,gz;\n#ifdef FASTROTATION\nvec4 qx=St;vec4 qy=-Ct;vec4 qz=vec4(0.0);vec4 px=sz*qy;vec4 py=-sz*qx;vec4 pz=sz_prime;psi+=alpha;vec4 Sa=sin(psi);vec4 Ca=cos(psi);gx=Ca*px+Sa*qx;gy=Ca*py+Sa*qy;gz=Ca*pz+Sa*qz;\n#else\nif(alpha!=0.0){vec4 Sp=sin(psi);vec4 Cp=cos(psi);vec4 px=Ct*sz_prime;vec4 py=St*sz_prime;vec4 pz=sz;vec4 Ctp=St*Sp-Ct*Cp;vec4 qx=mix(Ctp*St,Sp,sz);vec4 qy=mix(-Ctp*Ct,Cp,sz);vec4 qz=-(py*Cp+px*Sp);vec4 Sa=vec4(sin(alpha));vec4 Ca=vec4(cos(alpha));gx=Ca*px+Sa*qx;gy=Ca*py+Sa*qy;gz=Ca*pz+Sa*qz;}else{gx=Ct*sz_prime;gy=St*sz_prime;gz=sz;}\n#endif\nvec3 g0=vec3(gx.x,gy.x,gz.x);vec3 g1=vec3(gx.y,gy.y,gz.y);vec3 g2=vec3(gx.z,gy.z,gz.z);vec3 g3=vec3(gx.w,gy.w,gz.w);vec4 w=0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3));w=max(w,0.0);vec4 w2=w*w;vec4 w3=w2*w;vec4 gdotx=vec4(dot(g0,x0),dot(g1,x1),dot(g2,x2),dot(g3,x3));float n=dot(w3,gdotx);vec4 dw=-6.0*w2*gdotx;vec3 dn0=w3.x*g0+dw.x*x0;vec3 dn1=w3.y*g1+dw.y*x1;vec3 dn2=w3.z*g2+dw.z*x2;vec3 dn3=w3.w*g3+dw.w*x3;gradient=39.5*(dn0+dn1+dn2+dn3);return 39.5*n;}\n        uniform vec2 uRatio;\n        uniform float uFocalLength;\n        uniform float uFocusDistance;\n        uniform float uMinScale;\n        uniform float uMaxScale;\n        uniform float uTime;\n        uniform float uNoiseCoordScale;\n        uniform float uNoiseDisplacementScale;\n        varying float vBokeh;\n      " +
					e.vertexShader),
				(e.vertexShader = e.vertexShader.replace(
					"#include <project_vertex>",
					"vec4 mvPosition=vec4(0.0,0.0,0.0,1.0);mvPosition=instanceMatrix*mvPosition;vec3 grad;psrdnoise(mvPosition.xyz*uNoiseCoordScale,vec3(0),uTime*0.5,grad);grad*=uNoiseCoordScale;mvPosition.xyz+=grad*uNoiseDisplacementScale;float d=length(mvPosition.xyz-cameraPosition);vBokeh=smoothstep(0.0,uFocalLength,abs(d-uFocusDistance));float scale=uMinScale+uMaxScale*vBokeh;mvPosition=modelViewMatrix*mvPosition;gl_Position=projectionMatrix*mvPosition;gl_Position.xy+=transformed.xy*uRatio*scale*instanceMatrix[0][0];",
				)),
				(e.fragmentShader =
					"\n        uniform float uBlurLevel;\n        varying float vBokeh;\n      " +
					e.fragmentShader),
				(e.fragmentShader = e.fragmentShader.replace(
					"#include <map_fragment>",
					"#ifdef USE_MAP\nvec2 uv=vMapUv;uv.y/=8.0;float blurLevel=uBlurLevel*vBokeh;float uvY=floor(blurLevel);float uvYFract=fract(blurLevel);uv.y+=0.125*uvY;vec4 tex1=texture2D(map,uv);uv.y+=0.125;vec4 tex2=texture2D(map,uv);vec4 sampledDiffuseColor=mix(tex1,tex2,uvYFract);diffuseColor*=sampledDiffuseColor;\n#else\ndiffuseColor.a=0.0;\n#endif\n",
				));
		}),
			super(t, s, i.count),
			(this.config = i),
			(this.uniforms = n),
			(this.dummyO = new m()),
			this.#S();
	}
	#S() {
		for (let e = 0; e < this.count; e++)
			this.dummyO.position.set(A(2), A(2), A(1.7)),
				this.dummyO.scale.set(1, 1, 1).multiplyScalar(o.randFloat(0.5, 1)),
				this.dummyO.updateMatrix(),
				this.setMatrixAt(e, this.dummyO.matrix);
		this.#M();
	}
	#M() {
		const e = (function (e) {
			let i, t;
			return (
				s(e),
				{
					setColors: s,
					getColorAt: function (e, s = new c()) {
						const n = Math.max(0, Math.min(1, e)) * (i.length - 1),
							o = Math.floor(n),
							r = t[o];
						if (o >= i.length - 1) return r.clone();
						const a = n - o,
							v = t[o + 1];
						return (
							(s.r = r.r + a * (v.r - r.r)),
							(s.g = r.g + a * (v.g - r.g)),
							(s.b = r.b + a * (v.b - r.b)),
							s
						);
					},
				}
			);
			function s(e) {
				(i = e),
					(t = []),
					i.forEach((e) => {
						t.push(new c(e));
					});
			}
		})(this.config.colors);
		for (let i = 0; i < this.count; i++)
			this.setColorAt(i, e.getColorAt(Math.random()));
		this.instanceColor.needsUpdate = !0;
	}
	setColors(e) {
		(this.config.colors = e),
			this.#M(),
			console.log(e.map((e) => (16777215 & e).toString(16).padStart(6, "0")));
	}
	update(e) {
		this.uniforms.uTime.value += e.delta * this.uniforms.uTimeScale.value;
	}
	setSize(e, i) {
		e > i
			? this.uniforms.uRatio.value.set(1, e / i)
			: this.uniforms.uRatio.value.set(i / e, 1);
	}
}
function E(e, i) {
	const t = new x({ canvas: e, size: "parent" });
	(t.cameraMaxAspect = 1.7), (t.camera.position.z = 1), t.updateWorldSize();
	const s = new O();
	s.setSize(t.size.width, t.size.height), t.scene.add(s);
	const n = new p(),
		o = R({ domElement: e });
	return (
		(o.onMove = () => {
			(n.x = 0.1 * -o.nPosition.x), (n.y = 0.1 * -o.nPosition.y);
		}),
		(t.onBeforeRender = (e) => {
			s.position.lerp(n, 0.05), s.update(e);
		}),
		(t.onAfterResize = (e) => {
			s.setSize(e.width, e.height);
		}),
		{
			three: t,
			particles: s,
			loadMap: function (e) {
				L(e).then((e) => {
					(e.flipY = !1), (s.material.map = e), (s.material.needsUpdate = !0);
				});
			},
			bindMap: function (e) {
				e.flipY = !1;
				s.material.map = e;
				s.material.needsUpdate = !0;
			},
			setBackgroundColor(e) {
				t.scene.background = new c(e);
			},
			setColors: s.setColors.bind(s),
			dispose() {
				t.dispose();
			},
		}
	);
}
export { E as BokehBackground };
