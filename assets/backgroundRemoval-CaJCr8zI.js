var u0=Object.defineProperty;var l0=(e,t,r)=>t in e?u0(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var bo=(e,t,r)=>l0(e,typeof t!="symbol"?t+"":t,r);/*!
 * ONNX Runtime Web v1.31.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Hn=Object.defineProperty,d0=Object.getOwnPropertyDescriptor,p0=Object.getOwnPropertyNames,c0=Object.prototype.hasOwnProperty,h0=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),M=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(i){throw r=[i],i}},Kt=(e,t)=>{for(var r in t)Hn(e,r,{get:t[r],enumerable:!0})},f0=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of p0(t))!c0.call(e,n)&&n!==r&&Hn(e,n,{get:()=>t[n],enumerable:!(i=d0(t,n))||i.enumerable});return e},mr=e=>f0(Hn({},"__esModule",{value:!0}),e),Wt,st,ki,Gt,Ti,sp,op,Fn=M(()=>{"use strict";Wt=new Map,st=[],ki=new WeakMap,Gt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=Wt.get(e);if(i===void 0)Wt.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=st.indexOf(e);n!==-1&&st.splice(n,1);for(let a=0;a<st.length;a++)if(Wt.get(st[a]).priority<=r){st.splice(a,0,e);return}st.push(e)}return}throw new TypeError("not a valid backend")},Ti=async e=>{let t=Wt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{if(!r){let i=t.backend,n=ki.get(i);t.initPromise=n?n.then(async()=>i.init(e),async()=>i.init(e)):i.init(e),ki.set(i,t.initPromise)}return await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},sp=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?st:r,n,a=[],s=new Set;for(let l of i){let p=await Ti(l);typeof p=="string"?a.push({name:l,err:p}):(n||(n=p),n===p&&s.add(l))}if(!n)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of a)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[n,new Proxy(e,{get:(l,p)=>p==="executionProviders"?u:Reflect.get(l,p)})]},op=async()=>{let e=[];for(let r of st){if(typeof Wt.get(r).backend.createLoraAdapterHandler!="function")continue;let i=await Ti(r);if(typeof i!="string")return i;e.push({name:r,err:i})}let t=e.length===0?"":` ERR: ${e.map(r=>`[${r.name}] ${r.err}`).join(", ")}`;throw new Error(`no available backend supports LoRA adapters.${t}`)}}),m0=M(()=>{"use strict";Fn()}),up,g0=M(()=>{"use strict";up="1.31.1"}),Ii,Oe,lp=M(()=>{"use strict";g0(),Ii="warning",Oe={wasm:{},webgl:{},webgpu:{},versions:{common:up},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Ii=e}},get logLevel(){return Ii}},Object.defineProperty(Oe,"logLevel",{enumerable:!0})}),we,y0=M(()=>{"use strict";lp(),we=Oe}),Fr,Ei,We,Me,Bt,Rt,jn=M(()=>{"use strict";lp(),Fr=(e,t)=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ei=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(a+=`::${t}`),Fr("CPU",a);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},We=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||Ei("BEGIN",e)},Me=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||Ei("END",e)},Bt=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||console.time(`ORT::${e}`)},Rt=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||console.timeEnd(`ORT::${e}`)}}),Kn,dp=M(()=>{"use strict";Fn(),jn(),Kn=class pp{constructor(t,r){this.backend=t,this.handler=r}static async create(t){if(We(),typeof t!="string"&&!(t instanceof Uint8Array))throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let r=await op(),i=await r.createLoraAdapterHandler(t);return Me(),new pp(r,i)}async release(){return this.handler.dispose()}}}),cp,hp,_0=M(()=>{"use strict";cp=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[3]):(n=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,p;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let c=a*n,m=0,g=c,_=c*2,y=-1;s==="RGBA"?(m=0,g=c,_=c*2,y=c*3):s==="RGB"?(m=0,g=c,_=c*2):s==="RBG"&&(m=0,_=c,g=c*2);for(let v=0;v<a;v++)for(let S=0;S<n;S++){let $=(e.data[m++]-p[0])*l[0],w=(e.data[g++]-p[1])*l[1],T=(e.data[_++]-p[2])*l[2],I=y===-1?255:(e.data[y++]-p[3])*l[3];i.fillStyle="rgba("+$+","+w+","+T+","+I+")",i.fillRect(S,v,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},hp=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[1],s=e.dims[3]):(n=e.dims[3],a=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,c;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let m=a*n;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,_=0,y=1,v=2,S=3,$=0,w=m,T=m*2,I=-1;u==="RGBA"?($=0,w=m,T=m*2,I=m*3):u==="RGB"?($=0,w=m,T=m*2):u==="RBG"&&($=0,T=m,w=m*2),i=r.createImageData(n,a);for(let E=0;E<a*n;_+=g,y+=g,v+=g,S+=g,E++)i.data[_]=(e.data[$++]-c[0])*p[0],i.data[y]=(e.data[w++]-c[1])*p[1],i.data[v]=(e.data[T++]-c[2])*p[2],i.data[S]=I===-1?255:(e.data[I++]-c[3])*p[3]}else throw new Error("Can not access image data");return i}}),Cr,fp,mp,gp,yp,_p,w0=M(()=>{"use strict";Zn(),Cr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},a,s;typeof n.mean=="number"?a=[n.mean,n.mean,n.mean,n.mean]:a=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?s=[n.bias,n.bias,n.bias,n.bias]:s=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*i,c=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),m=4,g=0,_=1,y=2,v=3,S=0,$=p,w=p*2,T=-1;u==="RGB"&&(m=3,g=0,_=1,y=2,v=-1),l==="RGBA"?T=p*3:l==="RBG"?(S=0,w=p,$=p*2):l==="BGR"&&(w=0,$=p,S=p*2);for(let I=0;I<p;I++,g+=m,y+=m,_+=m,v+=m)c[S++]=(e[g]+s[0])/a[0],c[$++]=(e[_]+s[1])/a[1],c[w++]=(e[y]+s[2])/a[2],T!==-1&&v!==-1&&(c[T++]=(e[v]+s[3])/a[3]);return l==="RGBA"?new Ne("float32",c,[1,4,r,i]):new Ne("float32",c,[1,3,r,i])},fp=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=l();c.width=e.width,c.height=e.height;let m=p(c);if(m!=null){let g=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=_}else u.tensorFormat="RGBA",u.height=g,u.width=_;m.drawImage(e,0,0),s=m.getImageData(0,0,_,g).data}else throw new Error("Can not access image data")}else if(i){let c,m;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,m=t.resizedWidth):(c=e.height,m=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=c,u.width=m,t!==void 0){let g=l();g.width=m,g.height=c;let _=p(g);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,m,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let m=p(c);if(m!=null){let g=e.height,_=e.width;return m.drawImage(e,0,0,_,g),s=m.getImageData(0,0,_,g).data,u.height=g,u.width=_,Cr(s,u)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,m)=>{let g=l(),_=p(g);if(!e||!_)return m();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{g.width=y.width,g.height=y.height,_.drawImage(y,0,0,g.width,g.height);let v=_.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,c(Cr(v.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Cr(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},mp=(e,t)=>{let{width:r,height:i,download:n,dispose:a}=t,s=[1,i,r,4];return new Ne({location:"texture",type:"float32",texture:e,dims:s,download:n,dispose:a})},gp=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new Ne({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:a})},yp=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new Ne({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:a})},_p=(e,t,r)=>new Ne({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),zt,pr,Ci,wp,$0=M(()=>{"use strict";zt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),pr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ci=!1,wp=()=>{if(!Ci){Ci=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(zt.set("int64",BigInt64Array),pr.set(BigInt64Array,"int64")),t&&(zt.set("uint64",BigUint64Array),pr.set(BigUint64Array,"uint64")),i?(zt.set("float16",r),pr.set(r,"float16")):zt.set("float16",Uint16Array)}}}),$p,bp,b0=M(()=>{"use strict";Zn(),$p=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},bp=(e,t)=>{switch(e.location){case"cpu":return new Ne(e.type,e.data,t);case"cpu-pinned":return new Ne({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ne({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ne({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ne({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ne,Zn=M(()=>{"use strict";_0(),w0(),$0(),b0(),Ne=class{constructor(e,t,r){wp();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let s=zt.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=zt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",s=e;else if(l==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let l=pr.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");n=u,this.cpuData=s,this.dataLocation="cpu"}let a=$p(n);if(this.cpuData&&a!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=a}static async fromImage(e,t){return fp(e,t)}static fromTexture(e,t){return mp(e,t)}static fromGpuBuffer(e,t){return gp(e,t)}static fromMLTensor(e,t){return yp(e,t)}static fromPinnedBuffer(e,t,r){return _p(e,t,r)}toDataURL(e){return cp(this,e)}toImageData(e){return hp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return bp(this,e)}}}),Xe,vp=M(()=>{"use strict";Zn(),Xe=Ne}),xp,v0=M(()=>{"use strict";Fn(),dp(),vp(),jn(),xp=class Sp{constructor(t,r){this.handler=t,this.backend=r}async run(t,r,i){We(),Bt("InferenceSession.run");let n={},a={};if(typeof t!="object"||t===null||t instanceof Xe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Xe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);n[c]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(r);for(let g of this.outputNames)if(m.indexOf(g)!==-1){let _=r[g];(_===null||_ instanceof Xe)&&(c=!0,s=!1,n[g]=_)}if(c){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(s)for(let c of this.outputNames)n[c]=null;let u;if(a.activeLoraAdapters!==void 0){if(!Array.isArray(a.activeLoraAdapters))throw new TypeError("'activeLoraAdapters' must be an array.");u=a.activeLoraAdapters.map(c=>{if(!(c instanceof Kn))throw new TypeError("'activeLoraAdapters' must be an array of LoraAdapter objects.");if(c.backend!==this.backend)throw new Error("LoRA adapter was created by a different backend than the session.");return c.handler})}let l=await this.handler.run(t,n,a,u),p={};for(let c in l)if(Object.hasOwnProperty.call(l,c)){let m=l[c];m instanceof Xe?p[c]=m:p[c]=new Xe(m.type,m.data,m.dims)}return Rt("InferenceSession.run"),Me(),p}async release(){return this.handler.dispose()}static async create(t,r,i,n){We(),Bt("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,m=0,g=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteOffset' must be an integer.");if(m<0||m>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(g=t.byteLength-m,typeof i=="number"){if(g=i,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||m+g>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-m}].`);if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,m,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await sp(s),p=await u.createInferenceSessionHandler(a,l);return Rt("InferenceSession.create"),Me(),new Sp(p,u)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Qn,x0=M(()=>{"use strict";v0(),Qn=xp}),kp,S0=M(()=>{"use strict";dp(),kp=Kn}),k0=M(()=>{"use strict"}),T0=M(()=>{"use strict"}),I0=M(()=>{"use strict"}),E0=M(()=>{"use strict"}),C0={};Kt(C0,{InferenceSession:()=>Qn,LoraAdapter:()=>kp,TRACE:()=>Fr,TRACE_EVENT_BEGIN:()=>Bt,TRACE_EVENT_END:()=>Rt,TRACE_FUNC_BEGIN:()=>We,TRACE_FUNC_END:()=>Me,Tensor:()=>Xe,env:()=>we,registerBackend:()=>Gt});var Pe=M(()=>{"use strict";m0(),y0(),x0(),S0(),vp(),k0(),T0(),jn(),I0(),E0()}),Xn=M(()=>{"use strict"}),Tp={};Kt(Tp,{default:()=>Ip});var zi,Ai,Ip,z0=M(()=>{"use strict";Mf(),Ut(),Yn(),zi="ort-wasm-proxy-worker",Ai=globalThis.self?.name===zi,Ai&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Jn(r.wasm).then(()=>{ga(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:n}=r;ya(n,i).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:i}=r,n=Jr(i);postMessage({type:t,out:n});break}case"create":{let{model:i,options:n}=r;_a(i,n).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":wa(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:n,inputs:a,outputIndices:s,options:u}=r;$a(i,n,a,s,new Array(s.length).fill(null),u).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},va([...a,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":ba(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),Ip=Ai?null:e=>new Worker(e??De,{type:"module",name:zi})}),Ep={};Kt(Ep,{default:()=>Cp});async function vo(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,n=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(o,d)=>{o.startsWith("./")&&(o=o.substring(2)),(t.jd||(t.jd=new Map)).set(o,d)},t.unmountExternalData=()=>{delete t.jd,delete t.ke,delete t.je,delete t.le},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=o=>async(...d)=>{try{if(t.hd)throw Error("Session already started");let f=t.hd={Vd:d[0],errors:[]},h=await o(...d);if(t.hd!==f)throw Error("Session mismatch");t.pd?.flush();let b=f.errors;if(0<b.length){let k=await Promise.all(b);if(k=k.filter(A=>A),0<k.length)throw Error(k.join(`
`))}return h}finally{t.hd=null}};t.jsepInit=(o,d)=>{if(o==="webgpu"){[t.pd,t.Ld,t.Pd,t.rd,t.Od,t.ic,t.Qd,t.Sd,t.Md,t.Nd,t.Rd]=d;let f=t.pd;t.jsepRegisterBuffer=(h,b,k,A)=>f.registerBuffer(h,b,k,A),t.jsepGetBuffer=h=>f.getBuffer(h),t.jsepCreateDownloader=(h,b,k)=>f.createDownloader(h,b,k),t.jsepOnCreateSession=h=>{f.onCreateSession(h)},t.jsepOnReleaseSession=h=>{f.onReleaseSession(h)},t.jsepOnRunStart=h=>f.onRunStart(h),t.Td=(h,b)=>{f.upload(h,b)}}else if(o==="webnn"){let f=d[0];[t.ce,t.Cd,t.webnnEnsureTensor,t.Dd,t.webnnDownloadTensor,t.be,t.webnnEnableTraceEvent]=d.slice(1),t.webnnReleaseTensorId=t.Cd,t.webnnUploadTensor=t.Dd,t.webnnRegisterMLContext=t.be,t.webnnOnRunStart=h=>f.onRunStart(h),t.webnnOnRunEnd=f.onRunEnd.bind(f),t.webnnOnReleaseSession=h=>{f.onReleaseSession(h)},t.webnnCreateMLTensorDownloader=(h,b)=>f.createMLTensorDownloader(h,b),t.webnnRegisterMLTensor=(h,b,k,A)=>f.registerMLTensor(h,b,k,A),t.webnnCreateMLContext=h=>f.createMLContext(h),t.webnnRegisterGraphInput=f.registerGraphInput.bind(f),t.webnnIsGraphInput=f.isGraphInput.bind(f),t.webnnRegisterGraphOutput=f.registerGraphOutput.bind(f),t.webnnIsGraphOutput=f.isGraphOutput.bind(f),t.webnnCreateTemporaryTensor=f.createTemporaryTensor.bind(f),t.webnnIsGraphInputOutputTypeSupported=f.isGraphInputOutputTypeSupported.bind(f)}};let s=()=>{let o=d=>(...f)=>{let h=et;return f=d(...f),et!=h?new Promise((b,k)=>{ci={resolve:b,reject:k}}):f};(d=>{for(let f of d)t[f]=o(t[f])})("_OrtAppendExecutionProvider _OrtAppendExecutionProviderV2 _OrtCreateSession _OrtRun _OrtRunWithBinding _OrtBindInput".split(" ")),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s?.()};var u,l,p=(o,d)=>{throw d},c=import.meta.url,m="";if(r||i){try{m=new URL(".",c).href}catch{}i&&(l=o=>{var d=new XMLHttpRequest;return d.open("GET",o,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),u=async o=>{if(z(o))return new Promise((f,h)=>{var b=new XMLHttpRequest;b.open("GET",o,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?f(b.response):h(b.status)},b.onerror=h,b.send(null)});var d=await fetch(o,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var g,_,y,v,S,$,w=console.log.bind(console),T=console.error.bind(console),I=w,E=T,C=!1,z=o=>o.startsWith("file://");function x(){ct.buffer!=L.buffer&&H()}if(n){let o=function(d){try{var f=d.data,h=f.bd;if(h==="load"){let b=[];self.onmessage=k=>b.push(k),$=()=>{postMessage({bd:"loaded"});for(let k of b)o(k);self.onmessage=o};for(let k of f.Hd)t[k]&&!t[k].proxy||(t[k]=(...A)=>{postMessage({bd:"callHandler",Fd:k,args:A})},k=="print"&&(I=t[k]),k=="printErr"&&(E=t[k]));ct=f.Zd,H(),_=f.$d,Ve(),Er()}else if(h==="run"){(function(b){var k=(x(),W)[b+52>>>2>>>0];b=(x(),W)[b+56>>>2>>>0],Es(k,k-b),oe(k)})(f.ad),yi(f.ad,0,0,1,0,0),Ea(),li(f.ad),N||(vs(),N=!0);try{Yf(f.Xd,f.nd)}catch(b){if(b!="unwind")throw b}}else f.target!=="setimmediate"&&(h==="checkMailbox"?N&&br():h&&(E(`worker: received unknown command ${h}`),E(f)))}catch(b){throw xs(),b}};var N=!1;self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=o}var L,X,Q,J,O,W,Y,P,se,ne,te,U=!1;function H(){var o=ct.buffer;t.HEAP8=L=new Int8Array(o),Q=new Int16Array(o),t.HEAPU8=X=new Uint8Array(o),J=new Uint16Array(o),t.HEAP32=O=new Int32Array(o),t.HEAPU32=W=new Uint32Array(o),Y=new Float32Array(o),P=new Float64Array(o),se=new BigInt64Array(o),ne=new BigUint64Array(o)}function F(){U=!0,n?$():at.vb()}function V(o){throw E(o="Aborted("+o+")"),C=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),S?.(o),o}function Se(){return{a:{na:bg,jb:$g,g:Jf,G:em,f:tm,o:rm,h:im,$:nm,b:am,S:sm,Ja:Ra,n:om,aa:Ua,_a:Pa,Fa:La,Ha:qa,$a:Wa,Ya:Va,Ra:Ga,Xa:Ha,la:Fa,Ga:ja,Da:Ka,Za,Ea:Qa,eb:um,ga:lm,ya:dm,wa:cm,fa:fm,N:mm,I:gm,xa:ym,_:Sm,za:km,Ua:Tm,Ba:Em,Ka:Cm,ua:zm,ha:Am,Ta:li,bb:Om,Q:Nm,r:qm,c:oi,kb:Wm,y:Vm,M:Gm,D:Hm,m:Fm,s:ns,lb:jm,J:Km,R:Zm,j:Qm,u:Xm,q:Ym,k:Jm,Oa:eg,Pa:tg,Qa:rg,Ma:us,Na:ls,va:ds,gb:ng,db:sg,v:og,ba:ug,ia:lg,cb:ag,V:dg,ab:pg,Ca:cg,F:ig,U:hg,ma:Tr,Aa:mg,ib:fg,hb:gg,Va:fs,Wa:ms,Ia:ri,T:gs,La:ys,ka:_s,Sa:ws,ja:$s,nb:a0,oa:e0,ob:n0,pa:Jg,H:Wg,e:kg,t:xg,w:vg,B:Ng,pb:Qg,Z:Zg,x:Cg,qa:Xg,X:t0,ca:Kg,qb:jg,ea:Ig,O:Mg,sb:Gg,ra:Fg,tb:Vg,L:Lg,Y:Yg,d:Sg,A:Eg,l:Tg,mb:s0,p:Ag,z:Og,C:zg,E:Bg,K:Ug,sa:qg,P:r0,da:Pg,W:i0,ub:Dg,ta:Rg,rb:Hg,i:_g,a:ct,fb:Zt}}}async function Ve(){function o(h,b){var k=at=h.exports;h={};for(let[A,R]of Object.entries(k))typeof R=="function"?(k=Bm(R),h[A]=k):h[A]=R;return at=h,at=function(){var A=at,R=G=>ae=>G(ae)>>>0,q=G=>()=>G()>>>0;return(A=Object.assign({},A)).wb=R(A.wb),A.ec=q(A.ec),A.gc=R(A.gc),A.uc=R(A.uc),A.vc=q(A.vc),A.zc=R(A.zc),A}(),Ta.push(at.hc),bs=(h=at).wb,vs=h.xb,t._OrtInit=h.yb,t._OrtGetLastError=h.zb,t._OrtCreateSessionOptions=h.Ab,t._OrtAppendExecutionProvider=h.Bb,t._OrtGetEpDevices=h.Cb,t._OrtEpDevice_EpName=h.Db,t._OrtAppendExecutionProviderV2=h.Eb,t._OrtAddFreeDimensionOverride=h.Fb,t._OrtAddSessionConfigEntry=h.Gb,t._OrtReleaseSessionOptions=h.Hb,t._OrtCreateSession=h.Ib,t._OrtReleaseSession=h.Jb,t._OrtGetInputOutputCount=h.Kb,t._OrtGetInputOutputMetadata=h.Lb,t._OrtFree=h.Mb,t._OrtCreateTensor=h.Nb,t._OrtGetTensorData=h.Ob,t._OrtReleaseTensor=h.Pb,t._OrtCreateLoraAdapter=h.Qb,t._OrtReleaseLoraAdapter=h.Rb,t._OrtCreateRunOptions=h.Sb,t._OrtAddRunConfigEntry=h.Tb,t._OrtRunOptionsAddActiveLoraAdapter=h.Ub,t._OrtReleaseRunOptions=h.Vb,t._OrtCreateBinding=h.Wb,t._OrtBindInput=h.Xb,t._OrtBindOutput=h.Yb,t._OrtClearBoundOutputs=h.Zb,t._OrtReleaseBinding=h._b,t._OrtRunWithBinding=h.$b,t._OrtRun=h.ac,t._OrtEndProfiling=h.bc,t._JsepOutput=h.cc,t._JsepGetNodeName=h.dc,Ir=h.ec,tt=t._free=h.fc,Yt=t._malloc=h.gc,yi=h.jc,xs=h.kc,Ss=h.lc,ks=h.mc,_i=h.nc,Ts=h.oc,Is=h.pc,le=h.qc,Jt=h.rc,Es=h.sc,oe=h.tc,wi=h.uc,ue=h.vc,Cs=h.wc,$i=h.xc,zs=h.yc,As=h.zc,Os=h.Ac,bi=h.Bc,Bs=h.Cc,Rs=h.Dc,Ds=h.Ec,Ns=h.Fc,Ms=h.Gc,Us=h.Hc,Ps=h.Ic,Ls=h.Jc,qs=h.Kc,Ws=h.Lc,Vs=h.Mc,Gs=h.Nc,Hs=h.Oc,Fs=h.Pc,js=h.Qc,Ks=h.Rc,Zs=h.Sc,Qs=h.Tc,Xs=h.Uc,Ys=h.Vc,Js=h.Wc,eo=h.Xc,to=h.Yc,ro=h._c,io=h.$c,no=h.kd,ao=h.ld,so=h.qd,oo=h.vd,uo=h.wd,lo=h.xd,po=h.yd,co=h.zd,ho=h.Ad,fo=h.Bd,mo=h.Gd,go=h.Jd,yo=h.fe,_o=h.ge,wo=h.he,$o=h.ie,_=b,at}var d,f=Se();return t.instantiateWasm?new Promise(h=>{t.instantiateWasm(f,(b,k)=>{h(o(b,k))})}):n?o(new WebAssembly.Instance(_,Se()),_):(te??(te=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",m):m+"ort-wasm-simd-threaded.jsep.wasm":new URL("/pixcuro/assets/ort-wasm-simd-threaded.jsep-Dt5UNR3U.wasm",import.meta.url).href),d=await async function(h){var b=te;if(!g&&!z(b))try{var k=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(k,h)}catch(A){E(`wasm streaming compile failed: ${A}`),E("falling back to ArrayBuffer instantiation")}return async function(A,R){try{var q=await async function(G){if(!g)try{var ae=await u(G);return new Uint8Array(ae)}catch{}if(G==te&&g)G=new Uint8Array(g);else{if(!l)throw"both async and sync fetching of the wasm failed";G=l(G)}return G}(A);return await WebAssembly.instantiate(q,R)}catch(G){E(`failed to asynchronously prepare wasm: ${G}`),V(G)}}(b,h)}(f),o(d.instance,d.module))}class ze{constructor(d){bo(this,"name","ExitStatus");this.message=`Program terminated with exit(${d})`,this.status=d}}var Ie=o=>{o.terminate(),o.onmessage=()=>{}},ke=[],Ye=0,$e=null,be=o=>{pt.length==0&&(za(),Ca(pt[0]));var d=pt.pop();if(!d)return 6;Qt.push(d),bt[o.ad]=d,d.ad=o.ad;var f={bd:"run",Xd:o.Wd,nd:o.nd,ad:o.ad};return d.postMessage(f,o.ud),0},Ae=0,ye=(o,d,...f)=>{var h,b=16*f.length,k=ue(),A=wi(b),R=A>>>3;for(h of f)typeof h=="bigint"?((x(),se)[R++>>>0]=1n,(x(),se)[R++>>>0]=h):((x(),se)[R++>>>0]=0n,(x(),P)[R++>>>0]=h);return o=Ss(o,0,b,A,d),oe(k),o};function Zt(o){if(n)return ye(0,1,o);if(y=o,!(0<Ae)){for(var d of Qt)Ie(d);for(d of pt)Ie(d);pt=[],Qt=[],bt={},C=!0}p(0,new ze(o))}function ka(o){if(n)return ye(1,0,o);ri(o)}var ri=o=>{if(y=o,n)throw ka(o),"unwind";Zt(o)},pt=[],Qt=[],Ta=[],bt={},Ia=o=>{var d=o.ad;delete bt[d],pt.push(o),Qt.splice(Qt.indexOf(o),1),o.ad=0,ks(d)};function Ea(){Ta.forEach(o=>o())}var Ca=o=>new Promise(d=>{o.onmessage=b=>{var k=b.data;if(b=k.bd,k.md&&k.md!=Ir()){var A=bt[k.md];A?A.postMessage(k,k.ud):E(`Internal error! Worker sent a message "${b}" to target pthread ${k.md}, but that thread no longer exists!`)}else b==="checkMailbox"?br():b==="spawnThread"?be(k):b==="cleanupThread"?$r(()=>{Ia(bt[k.Yd])}):b==="loaded"?(o.loaded=!0,d(o)):k.target==="setimmediate"?o.postMessage(k):b==="uncaughtException"?o.onerror(k.error):b==="callHandler"?t[k.Fd](...k.args):b&&E(`worker sent an unknown command ${b}`)},o.onerror=b=>{throw E(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b};var f,h=[];for(f of[])t.propertyIsEnumerable(f)&&h.push(f);o.postMessage({bd:"load",Hd:h,Zd:ct,$d:_})});function za(){var o=new Worker((()=>{let d=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new d("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});pt.push(o)}var ct,Yf=(o,d)=>{Ae=0,o=bi(o,d),0<Ae?y=o:_i(o)},yr=[],_r=0;function Jf(o){var d=new ii(o>>>=0);return(x(),L)[d.cd+12>>>0]==0&&(Aa(d,!0),_r--),Oa(d,!1),yr.push(d),As(o)}var Lt=0,em=()=>{le(0,0);var o=yr.pop();Cs(o.od),Lt=0};function Aa(o,d){d=d?1:0,(x(),L)[o.cd+12>>>0]=d}function Oa(o,d){d=d?1:0,(x(),L)[o.cd+13>>>0]=d}class ii{constructor(d){this.od=d,this.cd=d-24}}var ni=o=>{var d=Lt;if(!d)return Jt(0),0;var f=new ii(d);(x(),W)[f.cd+16>>>2>>>0]=d;var h=(x(),W)[f.cd+4>>>2>>>0];if(!h)return Jt(0),d;for(var b of o){if(b===0||b===h)break;if(zs(b,h,f.cd+16))return Jt(b),d}return Jt(h),d};function tm(){return ni([])}function rm(o){return ni([o>>>0])}function im(o,d,f,h){return ni([o>>>0,d>>>0,f>>>0,h>>>0])}var nm=()=>{var o=yr.pop();o||V("no exception to throw");var d=o.od;throw(x(),L)[o.cd+13>>>0]==0&&(yr.push(o),Oa(o,!0),Aa(o,!1),_r++),$i(d),Lt=d};function am(o,d,f){var h=new ii(o>>>=0);throw d>>>=0,f>>>=0,(x(),W)[h.cd+16>>>2>>>0]=0,(x(),W)[h.cd+4>>>2>>>0]=d,(x(),W)[h.cd+8>>>2>>>0]=f,$i(o),_r++,Lt=o}var sm=()=>_r;function Ba(o,d,f,h){return n?ye(2,1,o,d,f,h):Ra(o,d,f,h)}function Ra(o,d,f,h){if(o>>>=0,d>>>=0,f>>>=0,h>>>=0,!globalThis.SharedArrayBuffer)return 6;var b=[];return n&&b.length===0?Ba(o,d,f,h):(o={Wd:f,ad:o,nd:h,ud:b},n?(o.bd="spawnThread",postMessage(o,b),0):be(o))}function om(o){throw Lt||(Lt=o>>>0),Lt}var Da=globalThis.TextDecoder&&new TextDecoder,Na=(o,d,f,h)=>{if(f=d+f,h)return f;for(;o[d]&&!(d>=f);)++d;return d},Ma=(o,d=0,f,h)=>{if(16<(f=Na(o,d>>>=0,f,h))-d&&o.buffer&&Da)return Da.decode(o.buffer instanceof ArrayBuffer?o.subarray(d,f):o.slice(d,f));for(h="";d<f;){var b=o[d++];if(128&b){var k=63&o[d++];if((224&b)==192)h+=String.fromCharCode((31&b)<<6|k);else{var A=63&o[d++];65536>(b=(240&b)==224?(15&b)<<12|k<<6|A:(7&b)<<18|k<<12|A<<6|63&o[d++])?h+=String.fromCharCode(b):(b-=65536,h+=String.fromCharCode(55296|b>>10,56320|1023&b))}}else h+=String.fromCharCode(b)}return h},Te=(o,d,f)=>(o>>>=0)?Ma((x(),X),o,d,f):"";function Ua(o,d,f){return n?ye(3,1,o,d,f):0}function Pa(o,d){if(n)return ye(4,1,o,d)}function La(o,d){if(n)return ye(5,1,o,d)}function qa(o,d,f){if(n)return ye(6,1,o,d,f)}function Wa(o,d,f){return n?ye(7,1,o,d,f):0}function Va(o,d){if(n)return ye(8,1,o,d)}function Ga(o,d,f){if(n)return ye(9,1,o,d,f)}function Ha(o,d,f,h){if(n)return ye(10,1,o,d,f,h)}function Fa(o,d,f,h){if(n)return ye(11,1,o,d,f,h)}function ja(o,d,f,h){if(n)return ye(12,1,o,d,f,h)}function Ka(o){if(n)return ye(13,1,o)}function Za(o,d){if(n)return ye(14,1,o,d)}function Qa(o,d,f){if(n)return ye(15,1,o,d,f)}var um=()=>V(""),Je=o=>{o>>>=0;for(var d="";;){var f=(x(),X)[o++>>>0];if(!f)return d;d+=String.fromCharCode(f)}},ai={},si={},qt=class extends Error{constructor(o){super(o),this.name="BindingError"}};function nt(o,d,f={}){return function(h,b,k={}){var A=b.name;if(!h)throw new qt(`type "${A}" must have a positive integer typeid pointer`);if(si.hasOwnProperty(h)){if(k.Id)return;throw new qt(`Cannot register type '${A}' twice`)}si[h]=b,ai.hasOwnProperty(h)&&(b=ai[h],delete ai[h],b.forEach(R=>R()))}(o,d,f)}var Xa=(o,d,f)=>{switch(d){case 1:return f?h=>(x(),L)[h>>>0]:h=>(x(),X)[h>>>0];case 2:return f?h=>(x(),Q)[h>>>1>>>0]:h=>(x(),J)[h>>>1>>>0];case 4:return f?h=>(x(),O)[h>>>2>>>0]:h=>(x(),W)[h>>>2>>>0];case 8:return f?h=>(x(),se)[h>>>3>>>0]:h=>(x(),ne)[h>>>3>>>0];default:throw new TypeError(`invalid integer width (${d}): ${o}`)}};function lm(o,d,f,h,b){o>>>=0,f>>>=0,d=Je(d>>>0);let k=A=>A;if(h=h===0n){let A=8*f;k=R=>BigInt.asUintN(A,R),b=k(b)}nt(o,{name:d,Zc:k,ed:(A,R)=>(typeof R=="number"&&(R=BigInt(R)),R),dd:Xa(d,f,!h),gd:null})}function dm(o,d,f,h){nt(o>>>=0,{name:d=Je(d>>>0),Zc:function(b){return!!b},ed:function(b,k){return k?f:h},dd:function(b){return this.Zc((x(),X)[b>>>0])},gd:null})}var Ya=[],vt=[0,1,,1,null,1,!0,1,!1,1];function oi(o){9<(o>>>=0)&&--vt[o+1]===0&&(vt[o]=void 0,Ya.push(o))}var Le=o=>{if(!o)throw new qt(`Cannot use deleted val. handle = ${o}`);return vt[o]},Ge=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=Ya.pop()||vt.length;return vt[d]=o,vt[d+1]=1,d}};function ui(o){return this.Zc((x(),W)[o>>>2>>>0])}var pm={name:"emscripten::val",Zc:o=>{var d=Le(o);return oi(o),d},ed:(o,d)=>Ge(d),dd:ui,gd:null};function cm(o){return nt(o>>>0,pm)}var hm=(o,d)=>{switch(d){case 4:return function(f){return this.Zc((x(),Y)[f>>>2>>>0])};case 8:return function(f){return this.Zc((x(),P)[f>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${o}`)}};function fm(o,d,f){f>>>=0,nt(o>>>=0,{name:d=Je(d>>>0),Zc:h=>h,ed:(h,b)=>b,dd:hm(d,f),gd:null})}function mm(o,d,f,h,b){o>>>=0,f>>>=0,d=Je(d>>>0);let k=R=>R;if(h===0){var A=32-8*f;k=R=>R<<A>>>A,b=k(b)}nt(o,{name:d,Zc:k,ed:(R,q)=>q,dd:Xa(d,f,h!==0),gd:null})}function gm(o,d,f){function h(k){var A=(x(),W)[k>>>2>>>0];return k=(x(),W)[k+4>>>2>>>0],new b((x(),L).buffer,k,A)}var b=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];nt(o>>>=0,{name:f=Je(f>>>0),Zc:h,dd:h},{Id:!0})}var ht=(o,d,f)=>{var h=(x(),X);if(d>>>=0,0<f){var b=d;f=d+f-1;for(var k=0;k<o.length;++k){var A=o.codePointAt(k);if(127>=A){if(d>=f)break;h[d++>>>0]=A}else if(2047>=A){if(d+1>=f)break;h[d++>>>0]=192|A>>6,h[d++>>>0]=128|63&A}else if(65535>=A){if(d+2>=f)break;h[d++>>>0]=224|A>>12,h[d++>>>0]=128|A>>6&63,h[d++>>>0]=128|63&A}else{if(d+3>=f)break;h[d++>>>0]=240|A>>18,h[d++>>>0]=128|A>>12&63,h[d++>>>0]=128|A>>6&63,h[d++>>>0]=128|63&A,k++}}h[d>>>0]=0,o=d-b}else o=0;return o},wr=o=>{for(var d=0,f=0;f<o.length;++f){var h=o.charCodeAt(f);127>=h?d++:2047>=h?d+=2:55296<=h&&57343>=h?(d+=4,++f):d+=3}return d};function ym(o,d){nt(o>>>=0,{name:d=Je(d>>>0),Zc(f){var h=(x(),W)[f>>>2>>>0];return h=Te(f+4,h,!0),tt(f),h},ed(f,h){h instanceof ArrayBuffer&&(h=new Uint8Array(h));var b=typeof h=="string";if(!(b||ArrayBuffer.isView(h)&&h.BYTES_PER_ELEMENT==1))throw new qt("Cannot pass non-string to std::string");var k=b?wr(h):h.length,A=Yt(4+k+1),R=A+4;return(x(),W)[A>>>2>>>0]=k,b?ht(h,R,k+1):(x(),X).set(h,R>>>0),f!==null&&f.push(tt,A),A},dd:ui,gd(f){tt(f)}})}var Ja=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,_m=(o,d,f)=>{if(o>>>=1,16<(d=Na((x(),J),o,d/2,f))-o&&Ja)return Ja.decode((x(),J).slice(o,d));for(f="";o<d;++o){var h=(x(),J)[o>>>0];f+=String.fromCharCode(h)}return f},wm=(o,d,f)=>{if(f??(f=2147483647),2>f)return 0;var h=d;f=(f-=2)<2*o.length?f/2:o.length;for(var b=0;b<f;++b){var k=o.charCodeAt(b);(x(),Q)[d>>>1>>>0]=k,d+=2}return(x(),Q)[d>>>1>>>0]=0,d-h},$m=o=>2*o.length,bm=(o,d,f)=>{var h="";o>>>=2;for(var b=0;!(b>=d/4);b++){var k=(x(),W)[o+b>>>0];if(!k&&!f)break;h+=String.fromCodePoint(k)}return h},vm=(o,d,f)=>{if(d>>>=0,f??(f=2147483647),4>f)return 0;var h=d;f=h+f-4;for(var b=0;b<o.length;++b){var k=o.codePointAt(b);if(65535<k&&b++,(x(),O)[d>>>2>>>0]=k,(d+=4)+4>f)break}return(x(),O)[d>>>2>>>0]=0,d-h},xm=o=>{for(var d=0,f=0;f<o.length;++f)65535<o.codePointAt(f)&&f++,d+=4;return d};function Sm(o,d,f){if(o>>>=0,d>>>=0,f=Je(f>>>=0),d===2)var h=_m,b=wm,k=$m;else h=bm,b=vm,k=xm;nt(o,{name:f,Zc:A=>{var R=(x(),W)[A>>>2>>>0];return R=h(A+4,R*d,!0),tt(A),R},ed:(A,R)=>{if(typeof R!="string")throw new qt(`Cannot pass non-string to C++ string type ${f}`);var q=k(R),G=Yt(4+q+d);return(x(),W)[G>>>2>>>0]=q/d,b(R,G+4,q+d),A!==null&&A.push(tt,G),G},dd:ui,gd(A){tt(A)}})}function km(o,d){nt(o>>>=0,{Kd:!0,name:d=Je(d>>>0),Zc:()=>{},ed:()=>{}})}function Tm(o){yi(o>>>0,!i,1,!r,131072,!1),Ea()}var $r=o=>{if(!C)try{if(o(),!(0<Ae))try{n?Ir()&&_i(y):ri(y)}catch(d){d instanceof ze||d=="unwind"||p(0,d)}}catch(d){d instanceof ze||d=="unwind"||p(0,d)}},Im=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function li(o){o>>>=0,Im||(Atomics.waitAsync((x(),O),o>>>2,o).value.then(br),o+=128,Atomics.store((x(),O),o>>>2,1))}var br=()=>$r(()=>{var o=Ir();o&&(li(o),Is())});function Em(o,d){(o>>>=0)==d>>>0?setTimeout(br):n?postMessage({md:o,bd:"checkMailbox"}):(o=bt[o])&&o.postMessage({bd:"checkMailbox"})}var di=[];function Cm(o,d,f,h,b){for(d>>>=0,b>>>=0,di.length=0,f=b>>>3,h=b+h>>>3;f<h;){var k;k=(x(),se)[f++>>>0]?(x(),se)[f++>>>0]:(x(),P)[f++>>>0],di.push(k)}return(d?vi[d]:wg[o])(...di)}var zm=()=>{Ae=0};function Am(o){o>>>=0,n?postMessage({bd:"cleanupThread",Yd:o}):Ia(bt[o])}function Om(o){}var vr=o=>{try{o()}catch(d){V(d)}};function Bm(o){var d=(...f)=>{xr.push(o);try{return o(...f)}finally{C||(xr.pop(),et&&ft===1&&xr.length===0&&(ft=0,Ae+=1,vr(_o),typeof Fibers<"u"&&Fibers.ne()))}};return rs.set(o,d),d}var ft=0,et=null,es=0,xr=[],pi=new Map,ts=new Map,rs=new Map,Rm=0,ci=null,Dm=[],is=o=>function(d){if(!C){if(ft===0){var f=!1,h=!1;d((b=0)=>{if(!C&&(es=b,f=!0,h)){ft=2,vr(()=>wo(et)),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.resume(),b=!1;try{var k=function(){var q=(x(),O)[et+8>>>2>>>0];return q=ts.get(q),q=rs.get(q),--Ae,q()}()}catch(q){k=q,b=!0}var A=!1;if(!et){var R=ci;R&&(ci=null,(b?R.reject:R.resolve)(k),A=!0)}if(b&&!A)throw k}}),h=!0,f||(ft=1,et=function(){var b=Yt(65548),k=b+12;if((x(),W)[b>>>2>>>0]=k,(x(),W)[b+4>>>2>>>0]=k+65536,k=xr[0],!pi.has(k)){var A=Rm++;pi.set(k,A),ts.set(A,k)}return k=pi.get(k),(x(),O)[b+8>>>2>>>0]=k,b}(),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.pause(),vr(()=>yo(et)))}else ft===2?(ft=0,vr($o),tt(et),et=null,Dm.forEach($r)):V(`invalid state: ${ft}`);return es}}(d=>{o().then(d)});function Nm(o){return o>>>=0,is(async()=>{var d=await Le(o);return Ge(d)})}var hi=[],Mm=o=>{var d=hi.length;return hi.push(o),d},Um=(o,d)=>{for(var f=Array(o),h=0;h<o;++h){var b=h,k=(x(),W)[d+4*h>>>2>>>0],A=si[k];if(A===void 0)throw o=`parameter ${h}`,k=bs(k),d=Je(k),tt(k),new qt(`${o} has unknown type ${d}`);f[b]=A}return f},Pm=(o,d,f)=>{var h=[];return o=o(h,f),h.length&&((x(),W)[d>>>2>>>0]=Ge(h)),o},Lm={},Sr=o=>{var d=Lm[o];return d===void 0?Je(o):d};function qm(o,d,f){var[h,...b]=Um(o,d>>>0);d=h.ed.bind(h);var k=b.map(q=>q.dd.bind(q));o--;var A={toValue:Le};switch(o=k.map((q,G)=>{var ae=`argFromPtr${G}`;return A[ae]=q,`${ae}(args${G?"+"+8*G:""})`}),f){case 0:var R="toValue(handle)";break;case 2:R="new (toValue(handle))";break;case 3:R="";break;case 1:A.getStringOrSymbol=Sr,R="toValue(handle)[getStringOrSymbol(methodName)]"}return R+=`(${o})`,h.Kd||(A.toReturnWire=d,A.emval_returnValue=Pm,R=`return emval_returnValue(toReturnWire, destructorsRef, ${R})`),R=`return function (handle, methodName, destructorsRef, args) {
  ${R}
  }`,f=new Function(Object.keys(A),R)(...Object.values(A)),R=`methodCaller<(${b.map(q=>q.name)}) => ${h.name}>`,Mm(Object.defineProperty(f,"name",{value:R}))}function Wm(o,d){return d>>>=0,(o=Le(o>>>0))==Le(d)}function Vm(o){return(o>>>=0)?(o=Sr(o),Ge(globalThis[o])):Ge(globalThis)}function Gm(o){return o=Sr(o>>>0),Ge(t[o])}function Hm(o,d){return d>>>=0,o=Le(o>>>0),d=Le(d),Ge(o[d])}function Fm(o){9<(o>>>=0)&&(vt[o+1]+=1)}function ns(o,d,f,h,b){return hi[o>>>0](d>>>0,f>>>0,h>>>0,b>>>0)}function jm(o,d,f,h,b){return ns(o>>>0,d>>>0,f>>>0,h>>>0,b>>>0)}function Km(){return Ge([])}function Zm(o){o=Le(o>>>0);for(var d=Array(o.length),f=0;f<o.length;f++)d[f]=o[f];return Ge(d)}function Qm(o){return Ge(Sr(o>>>0))}function Xm(){return Ge({})}function Ym(o){for(var d=Le(o>>>=0);d.length;){var f=d.pop();d.pop()(f)}oi(o)}function Jm(o,d,f){d>>>=0,f>>>=0,o=Le(o>>>0),d=Le(d),f=Le(f),o[d]=f}function eg(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(x(),O)[d>>>2>>>0]=o.getUTCSeconds(),(x(),O)[d+4>>>2>>>0]=o.getUTCMinutes(),(x(),O)[d+8>>>2>>>0]=o.getUTCHours(),(x(),O)[d+12>>>2>>>0]=o.getUTCDate(),(x(),O)[d+16>>>2>>>0]=o.getUTCMonth(),(x(),O)[d+20>>>2>>>0]=o.getUTCFullYear()-1900,(x(),O)[d+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(x(),O)[d+28>>>2>>>0]=o}var as=o=>o%4==0&&(o%100!=0||o%400==0),ss=[0,31,60,91,121,152,182,213,244,274,305,335],os=[0,31,59,90,120,151,181,212,243,273,304,334];function tg(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(x(),O)[d>>>2>>>0]=o.getSeconds(),(x(),O)[d+4>>>2>>>0]=o.getMinutes(),(x(),O)[d+8>>>2>>>0]=o.getHours(),(x(),O)[d+12>>>2>>>0]=o.getDate(),(x(),O)[d+16>>>2>>>0]=o.getMonth(),(x(),O)[d+20>>>2>>>0]=o.getFullYear()-1900,(x(),O)[d+24>>>2>>>0]=o.getDay();var f=(as(o.getFullYear())?ss:os)[o.getMonth()]+o.getDate()-1|0;(x(),O)[d+28>>>2>>>0]=f,(x(),O)[d+36>>>2>>>0]=-60*o.getTimezoneOffset(),f=new Date(o.getFullYear(),6,1).getTimezoneOffset();var h=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(f!=h&&o.getTimezoneOffset()==Math.min(h,f)),(x(),O)[d+32>>>2>>>0]=o}function rg(o){o>>>=0;var d=new Date((x(),O)[o+20>>>2>>>0]+1900,(x(),O)[o+16>>>2>>>0],(x(),O)[o+12>>>2>>>0],(x(),O)[o+8>>>2>>>0],(x(),O)[o+4>>>2>>>0],(x(),O)[o>>>2>>>0],0),f=(x(),O)[o+32>>>2>>>0],h=d.getTimezoneOffset(),b=new Date(d.getFullYear(),6,1).getTimezoneOffset(),k=new Date(d.getFullYear(),0,1).getTimezoneOffset(),A=Math.min(k,b);return 0>f?(x(),O)[o+32>>>2>>>0]=+(b!=k&&A==h):0<f!=(A==h)&&(b=Math.max(k,b),d.setTime(d.getTime()+6e4*((0<f?A:b)-h))),(x(),O)[o+24>>>2>>>0]=d.getDay(),f=(as(d.getFullYear())?ss:os)[d.getMonth()]+d.getDate()-1|0,(x(),O)[o+28>>>2>>>0]=f,(x(),O)[o>>>2>>>0]=d.getSeconds(),(x(),O)[o+4>>>2>>>0]=d.getMinutes(),(x(),O)[o+8>>>2>>>0]=d.getHours(),(x(),O)[o+12>>>2>>>0]=d.getDate(),(x(),O)[o+16>>>2>>>0]=d.getMonth(),(x(),O)[o+20>>>2>>>0]=d.getYear(),o=d.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function us(o,d,f,h,b,k,A){return n?ye(16,1,o,d,f,h,b,k,A):-52}function ls(o,d,f,h,b,k){if(n)return ye(17,1,o,d,f,h,b,k)}var Xt={},ig=()=>performance.timeOrigin+performance.now();function ds(o,d){if(n)return ye(18,1,o,d);if(Xt[o]&&(clearTimeout(Xt[o].id),delete Xt[o]),!d)return 0;var f=setTimeout(()=>{delete Xt[o],$r(()=>Ts(o,performance.timeOrigin+performance.now()))},d);return Xt[o]={id:f,me:d},0}function ng(o,d,f,h){o>>>=0,d>>>=0,f>>>=0,h>>>=0;var b=new Date().getFullYear(),k=new Date(b,0,1).getTimezoneOffset();b=new Date(b,6,1).getTimezoneOffset();var A=Math.max(k,b);(x(),W)[o>>>2>>>0]=60*A,(x(),O)[d>>>2>>>0]=+(k!=b),o=(d=R=>{var q=Math.abs(R);return`UTC${0<=R?"-":"+"}${String(Math.floor(q/60)).padStart(2,"0")}${String(q%60).padStart(2,"0")}`})(k),d=d(b),b<k?(ht(o,f,17),ht(d,h,17)):(ht(o,h,17),ht(d,f,17))}var ag=()=>Date.now();function sg(o,d,f){return f>>>=0,0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),o=Math.round(1e6*o),(x(),se)[f>>>3>>>0]=BigInt(o),0):28}var fi=[],ps=(o,d)=>{fi.length=0;for(var f;f=(x(),X)[o++>>>0];){var h=f!=105;d+=(h&=f!=112)&&d%8?4:0,fi.push(f==112?(x(),W)[d>>>2>>>0]:f==106?(x(),se)[d>>>3>>>0]:f==105?(x(),O)[d>>>2>>>0]:(x(),P)[d>>>3>>>0]),d+=h?8:4}return fi};function og(o,d,f){return o>>>=0,d=ps(d>>>0,f>>>0),vi[o](...d)}function ug(o,d,f){return o>>>=0,d=ps(d>>>0,f>>>0),vi[o](...d)}var lg=()=>{};function dg(o,d){return E(Te(o>>>0,d>>>0))}var pg=()=>{throw Ae+=1,"unwind"};function cg(){return 4294901760}var hg=()=>navigator.hardwareConcurrency,xt={},kr=o=>{var d;return(d=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+d[1]:(d=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+d[1]:0},cs=o=>{for(var d of o)(o=kr(d))&&(xt[o]=d)};function fg(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),cs(o),xt.sd=kr(o[3]),xt.Ud=o,xt.sd}function Tr(o){if(!(o=xt[o>>>0]))return 0;var d;if(d=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=d[1];else if(d=/^\s+at (.*) \(.*\)$/.exec(o))o=d[1];else{if(!(d=/^(.+?)@/.exec(o)))return 0;o=d[1]}tt(Tr.td??0),d=wr(o)+1;var f=Yt(d);return f&&ht(o,f,d),Tr.td=f,Tr.td}function mg(o){o>>>=0;var d=(x(),X).length;if(o<=d||4294901760<o)return!1;for(var f=1;4>=f;f*=2){var h=d*(1+.2/f);h=Math.min(h,o+100663296);e:{h=(Math.min(4294901760,65536*Math.ceil(Math.max(o,h)/65536))-ct.buffer.byteLength+65535)/65536|0;try{ct.grow(h),H();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1}function gg(o,d,f){if(o>>>=0,d>>>=0,xt.sd==o)var h=xt.Ud;else(h=Error().stack.toString().split(`
`))[0]=="Error"&&h.shift(),cs(h);for(var b=3;h[b]&&kr(h[b])!=o;)++b;for(o=0;o<f&&h[o+b];++o)(x(),O)[d+4*o>>>2>>>0]=kr(h[o+b]);return o}var mi,gi={},hs=()=>{if(!mi){var o,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in gi)gi[o]===void 0?delete d[o]:d[o]=gi[o];var f=[];for(o in d)f.push(`${o}=${d[o]}`);mi=f}return mi};function fs(o,d){if(n)return ye(19,1,o,d);o>>>=0,d>>>=0;var f,h=0,b=0;for(f of hs()){var k=d+h;(x(),W)[o+b>>>2>>>0]=k,h+=ht(f,k,1/0)+1,b+=4}return 0}function ms(o,d){if(n)return ye(20,1,o,d);o>>>=0,d>>>=0;var f=hs();for(var h of((x(),W)[o>>>2>>>0]=f.length,o=0,f))o+=wr(h)+1;return(x(),W)[d>>>2>>>0]=o,0}function gs(o){return n?ye(21,1,o):52}function ys(o,d,f,h,b){return n?ye(22,1,o,d,f,h,b):52}function _s(o,d,f,h){return n?ye(23,1,o,d,f,h):52}function ws(o,d,f,h){return n?ye(24,1,o,d,f,h):70}var yg=[null,[],[]];function $s(o,d,f,h){if(n)return ye(25,1,o,d,f,h);d>>>=0,f>>>=0,h>>>=0;for(var b=0,k=0;k<f;k++){var A=(x(),W)[d>>>2>>>0],R=(x(),W)[d+4>>>2>>>0];d+=8;for(var q=0;q<R;q++){var G=o,ae=(x(),X)[A+q>>>0],pe=yg[G];ae===0||ae===10?((G===1?I:E)(Ma(pe)),pe.length=0):pe.push(ae)}b+=R}return(x(),W)[h>>>2>>>0]=b,0}function _g(o){return o>>>0}n||function(){for(var o=t.numThreads-1;o--;)za();ke.push(async()=>{var d=async function(){if(!n)return Promise.all(pt.map(Ca))}();Ye++,await d,--Ye==0&&$e&&(d=$e,$e=null,d())})}(),n||(ct=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),H()),t.wasmBinary&&(g=t.wasmBinary),t.stackSave=()=>ue(),t.stackRestore=o=>oe(o),t.stackAlloc=o=>wi(o),t.setValue=function(o,d,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":(x(),L)[o>>>0]=d;break;case"i16":(x(),Q)[o>>>1>>>0]=d;break;case"i32":(x(),O)[o>>>2>>>0]=d;break;case"i64":(x(),se)[o>>>3>>>0]=BigInt(d);break;case"float":(x(),Y)[o>>>2>>>0]=d;break;case"double":(x(),P)[o>>>3>>>0]=d;break;case"*":(x(),W)[o>>>2>>>0]=d;break;default:V(`invalid type for setValue: ${f}`)}},t.getValue=function(o,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return(x(),L)[o>>>0];case"i16":return(x(),Q)[o>>>1>>>0];case"i32":return(x(),O)[o>>>2>>>0];case"i64":return(x(),se)[o>>>3>>>0];case"float":return(x(),Y)[o>>>2>>>0];case"double":return(x(),P)[o>>>3>>>0];case"*":return(x(),W)[o>>>2>>>0];default:V(`invalid type for getValue: ${d}`)}},t.UTF8ToString=Te,t.stringToUTF8=ht,t.lengthBytesUTF8=wr;var bs,vs,Ir,tt,Yt,yi,xs,Ss,ks,_i,Ts,Is,le,Jt,Es,oe,wi,ue,Cs,$i,zs,As,Os,bi,Bs,Rs,Ds,Ns,Ms,Us,Ps,Ls,qs,Ws,Vs,Gs,Hs,Fs,js,Ks,Zs,Qs,Xs,Ys,Js,eo,to,ro,io,no,ao,so,oo,uo,lo,po,co,ho,fo,mo,go,yo,_o,wo,$o,at,wg=[Zt,ka,Ba,Ua,Pa,La,qa,Wa,Va,Ga,Ha,Fa,ja,Ka,Za,Qa,us,ls,ds,fs,ms,gs,ys,_s,ws,$s],vi={1124124:(o,d,f,h,b)=>{if(t===void 0||!t.jd)return 1;if((o=Te(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.jd.get(o)))return 2;if(d=Number(d>>>0),f=Number(f>>>0),h=Number(h>>>0),d+f>o.byteLength)return 3;try{let k=o.subarray(d,d+f);switch(b){case 0:(x(),X).set(k,h>>>0);break;case 1:t.ae?t.ae(h,k):t.Td(h,k);break;default:return 4}return 0}catch{return 4}},1124948:()=>typeof navigator<"u"&&navigator.de?1:0,1125020:(o,d,f)=>{t.Dd(o,(x(),X).subarray(d>>>0,d+f>>>0))},1125084:()=>t.ce(),1125126:o=>{t.Cd(o)},1125163:()=>{t.Md()},1125194:()=>{t.Nd()},1125223:()=>{t.Rd()},1125248:o=>t.Ld(o),1125281:o=>t.Pd(o),1125313:(o,d,f)=>{t.rd(Number(o),Number(d),Number(f),!0)},1125376:(o,d,f)=>{t.rd(Number(o),Number(d),Number(f))},1125433:()=>typeof wasmOffsetConverter<"u",1125490:o=>{t.ic("Abs",o,void 0)},1125541:o=>{t.ic("Neg",o,void 0)},1125592:o=>{t.ic("Floor",o,void 0)},1125645:o=>{t.ic("Ceil",o,void 0)},1125697:o=>{t.ic("Reciprocal",o,void 0)},1125755:o=>{t.ic("Sqrt",o,void 0)},1125807:o=>{t.ic("Exp",o,void 0)},1125858:o=>{t.ic("Erf",o,void 0)},1125909:o=>{t.ic("Sigmoid",o,void 0)},1125964:(o,d,f)=>{t.ic("HardSigmoid",o,{alpha:d,beta:f})},1126043:o=>{t.ic("HardSwish",o,void 0)},1126100:o=>{t.ic("Log",o,void 0)},1126151:o=>{t.ic("Sin",o,void 0)},1126202:o=>{t.ic("Cos",o,void 0)},1126253:o=>{t.ic("Tan",o,void 0)},1126304:o=>{t.ic("Asin",o,void 0)},1126356:o=>{t.ic("Acos",o,void 0)},1126408:o=>{t.ic("Atan",o,void 0)},1126460:o=>{t.ic("Sinh",o,void 0)},1126512:o=>{t.ic("Cosh",o,void 0)},1126564:o=>{t.ic("Asinh",o,void 0)},1126617:o=>{t.ic("Acosh",o,void 0)},1126670:o=>{t.ic("Atanh",o,void 0)},1126723:o=>{t.ic("Tanh",o,void 0)},1126775:o=>{t.ic("Not",o,void 0)},1126826:(o,d,f)=>{t.ic("Clip",o,{min:d,max:f})},1126895:o=>{t.ic("Clip",o,void 0)},1126947:(o,d)=>{t.ic("Elu",o,{alpha:d})},1127005:o=>{t.ic("Gelu",o,void 0)},1127057:o=>{t.ic("Relu",o,void 0)},1127109:(o,d)=>{t.ic("LeakyRelu",o,{alpha:d})},1127173:(o,d)=>{t.ic("ThresholdedRelu",o,{alpha:d})},1127243:(o,d)=>{t.ic("Cast",o,{to:d})},1127301:o=>{t.ic("Add",o,void 0)},1127352:o=>{t.ic("Sub",o,void 0)},1127403:o=>{t.ic("Mul",o,void 0)},1127454:o=>{t.ic("Div",o,void 0)},1127505:o=>{t.ic("Pow",o,void 0)},1127556:o=>{t.ic("Equal",o,void 0)},1127609:o=>{t.ic("Greater",o,void 0)},1127664:o=>{t.ic("GreaterOrEqual",o,void 0)},1127726:o=>{t.ic("Less",o,void 0)},1127778:o=>{t.ic("LessOrEqual",o,void 0)},1127837:(o,d,f,h,b)=>{t.ic("ReduceMean",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1128012:(o,d,f,h,b)=>{t.ic("ReduceMax",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1128186:(o,d,f,h,b)=>{t.ic("ReduceMin",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1128360:(o,d,f,h,b)=>{t.ic("ReduceProd",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1128535:(o,d,f,h,b)=>{t.ic("ReduceSum",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1128709:(o,d,f,h,b)=>{t.ic("ReduceL1",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1128882:(o,d,f,h,b)=>{t.ic("ReduceL2",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1129055:(o,d,f,h,b)=>{t.ic("ReduceLogSum",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1129232:(o,d,f,h,b)=>{t.ic("ReduceSumSquare",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1129412:(o,d,f,h,b)=>{t.ic("ReduceLogSumExp",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1129592:o=>{t.ic("Where",o,void 0)},1129645:(o,d,f)=>{t.ic("Transpose",o,{perm:d?Array.from((x(),O).subarray(Number(d)>>>0,Number(f)>>>0)):[]})},1129769:(o,d,f,h)=>{t.ic("DepthToSpace",o,{blocksize:d,mode:Te(f),format:h?"NHWC":"NCHW"})},1129902:(o,d,f,h)=>{t.ic("DepthToSpace",o,{blocksize:d,mode:Te(f),format:h?"NHWC":"NCHW"})},1130035:(o,d,f,h)=>{t.ic("DFT",o,{axis:d,inverse:f,onesided:h})},1130127:(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e,mt)=>{t.ic("ConvTranspose",o,{format:q?"NHWC":"NCHW",autoPad:d,dilations:[f],group:h,kernelShape:[b],pads:[k,A],strides:[R],wIsConst:()=>!!(x(),L)[G>>>0],outputPadding:ae?Array.from((x(),O).subarray(Number(ae)>>>0,Number(pe)>>>0)):[],outputShape:ge?Array.from((x(),O).subarray(Number(ge)>>>0,Number(_e)>>>0)):[],activation:Te(mt)})},1130560:(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e)=>{t.ic("ConvTranspose",o,{format:R?"NHWC":"NCHW",autoPad:d,dilations:Array.from((x(),O).subarray(Number(f)>>>0,(Number(f)>>>0)+2>>>0)),group:h,kernelShape:Array.from((x(),O).subarray(Number(b)>>>0,(Number(b)>>>0)+2>>>0)),pads:Array.from((x(),O).subarray(Number(k)>>>0,(Number(k)>>>0)+4>>>0)),strides:Array.from((x(),O).subarray(Number(A)>>>0,(Number(A)>>>0)+2>>>0)),wIsConst:()=>!!(x(),L)[q>>>0],outputPadding:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],outputShape:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[],activation:Te(_e)})},1131221:(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e,mt)=>{t.ic("ConvTranspose",o,{format:q?"NHWC":"NCHW",autoPad:d,dilations:[f],group:h,kernelShape:[b],pads:[k,A],strides:[R],wIsConst:()=>!!(x(),L)[G>>>0],outputPadding:ae?Array.from((x(),O).subarray(Number(ae)>>>0,Number(pe)>>>0)):[],outputShape:ge?Array.from((x(),O).subarray(Number(ge)>>>0,Number(_e)>>>0)):[],activation:Te(mt)})},1131654:(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e)=>{t.ic("ConvTranspose",o,{format:R?"NHWC":"NCHW",autoPad:d,dilations:Array.from((x(),O).subarray(Number(f)>>>0,(Number(f)>>>0)+2>>>0)),group:h,kernelShape:Array.from((x(),O).subarray(Number(b)>>>0,(Number(b)>>>0)+2>>>0)),pads:Array.from((x(),O).subarray(Number(k)>>>0,(Number(k)>>>0)+4>>>0)),strides:Array.from((x(),O).subarray(Number(A)>>>0,(Number(A)>>>0)+2>>>0)),wIsConst:()=>!!(x(),L)[q>>>0],outputPadding:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],outputShape:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[],activation:Te(_e)})},1132315:(o,d)=>{t.ic("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},1132406:(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e)=>{t.ic("AveragePool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:f,count_include_pad:h,storage_order:b,dilations:k?Array.from((x(),O).subarray(Number(k)>>>0,Number(A)>>>0)):[],kernel_shape:R?Array.from((x(),O).subarray(Number(R)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},1132885:(o,d)=>{t.ic("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},1132976:(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e)=>{t.ic("AveragePool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:f,count_include_pad:h,storage_order:b,dilations:k?Array.from((x(),O).subarray(Number(k)>>>0,Number(A)>>>0)):[],kernel_shape:R?Array.from((x(),O).subarray(Number(R)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},1133455:(o,d)=>{t.ic("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},1133542:(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e)=>{t.ic("MaxPool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:f,count_include_pad:h,storage_order:b,dilations:k?Array.from((x(),O).subarray(Number(k)>>>0,Number(A)>>>0)):[],kernel_shape:R?Array.from((x(),O).subarray(Number(R)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},1134017:(o,d)=>{t.ic("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},1134104:(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e)=>{t.ic("MaxPool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:f,count_include_pad:h,storage_order:b,dilations:k?Array.from((x(),O).subarray(Number(k)>>>0,Number(A)>>>0)):[],kernel_shape:R?Array.from((x(),O).subarray(Number(R)>>>0,Number(q)>>>0)):[],pads:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((x(),O).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},1134579:(o,d,f,h,b)=>{t.ic("Gemm",o,{alpha:d,beta:f,transA:h,transB:b})},1134683:o=>{t.ic("MatMul",o,void 0)},1134737:(o,d,f,h)=>{t.ic("ArgMax",o,{keepDims:!!d,selectLastIndex:!!f,axis:h})},1134845:(o,d,f,h)=>{t.ic("ArgMin",o,{keepDims:!!d,selectLastIndex:!!f,axis:h})},1134953:(o,d)=>{t.ic("Softmax",o,{axis:d})},1135016:(o,d)=>{t.ic("Concat",o,{axis:d})},1135076:(o,d,f,h,b)=>{t.ic("Split",o,{axis:d,numOutputs:f,splitSizes:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1135232:o=>{t.ic("Expand",o,void 0)},1135286:(o,d)=>{t.ic("Gather",o,{axis:Number(d)})},1135357:(o,d)=>{t.ic("GatherElements",o,{axis:Number(d)})},1135436:(o,d)=>{t.ic("GatherND",o,{batch_dims:Number(d)})},1135515:(o,d,f,h,b,k,A,R,q,G,ae)=>{t.ic("Resize",o,{antialias:d,axes:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(h)>>>0)):[],coordinateTransformMode:Te(b),cubicCoeffA:k,excludeOutside:A,extrapolationValue:R,keepAspectRatioPolicy:Te(q),mode:Te(G),nearestMode:Te(ae)})},1135877:(o,d,f,h,b,k,A)=>{t.ic("Slice",o,{starts:d?Array.from((x(),O).subarray(Number(d)>>>0,Number(f)>>>0)):[],ends:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[],axes:k?Array.from((x(),O).subarray(Number(k)>>>0,Number(A)>>>0)):[]})},1136141:o=>{t.ic("Tile",o,void 0)},1136193:(o,d,f)=>{t.ic("InstanceNormalization",o,{epsilon:d,format:f?"NHWC":"NCHW"})},1136307:(o,d,f)=>{t.ic("InstanceNormalization",o,{epsilon:d,format:f?"NHWC":"NCHW"})},1136421:o=>{t.ic("Range",o,void 0)},1136474:(o,d)=>{t.ic("Einsum",o,{equation:Te(d)})},1136555:(o,d,f,h,b)=>{t.ic("Pad",o,{mode:d,value:f,pads:h?Array.from((x(),O).subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1136698:(o,d,f,h,b,k)=>{t.ic("BatchNormalization",o,{epsilon:d,momentum:f,spatial:!!b,trainingMode:!!h,format:k?"NHWC":"NCHW"})},1136867:(o,d,f,h,b,k)=>{t.ic("BatchNormalization",o,{epsilon:d,momentum:f,spatial:!!b,trainingMode:!!h,format:k?"NHWC":"NCHW"})},1137036:(o,d,f)=>{t.ic("CumSum",o,{exclusive:Number(d),reverse:Number(f)})},1137133:(o,d,f)=>{t.ic("DequantizeLinear",o,{axis:d,blockSize:f})},1137223:(o,d,f,h,b)=>{t.ic("GridSample",o,{align_corners:d,mode:Te(f),padding_mode:Te(h),format:b?"NHWC":"NCHW"})},1137393:(o,d,f,h,b)=>{t.ic("GridSample",o,{align_corners:d,mode:Te(f),padding_mode:Te(h),format:b?"NHWC":"NCHW"})},1137563:(o,d)=>{t.ic("ScatterND",o,{reduction:Te(d)})},1137648:(o,d,f,h,b,k,A,R,q)=>{t.ic("Attention",o,{numHeads:d,isUnidirectional:f,maskFilterValue:h,scale:b,doRotary:k,qkvHiddenSizes:A?Array.from((x(),O).subarray(Number(R)>>>0,Number(R)+A>>>0)):[],pastPresentShareBuffer:!!q})},1137920:o=>{t.ic("BiasAdd",o,void 0)},1137975:o=>{t.ic("BiasSplitGelu",o,void 0)},1138036:o=>{t.ic("FastGelu",o,void 0)},1138092:(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e,mt,xi)=>{t.ic("Conv",o,{format:pe?"NHWC":"NCHW",auto_pad:d,dilations:f?Array.from((x(),O).subarray(Number(f)>>>0,Number(h)>>>0)):[],group:b,kernel_shape:k?Array.from((x(),O).subarray(Number(k)>>>0,Number(A)>>>0)):[],pads:R?Array.from((x(),O).subarray(Number(R)>>>0,Number(q)>>>0)):[],strides:G?Array.from((x(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],w_is_const:()=>!!(x(),L)[Number(ge)>>>0],activation:Te(_e),activation_params:mt?Array.from((x(),Y).subarray(Number(mt)>>>0,Number(xi)>>>0)):[]})},1138676:o=>{t.ic("Gelu",o,void 0)},1138728:(o,d,f,h,b,k,A,R,q)=>{t.ic("GroupQueryAttention",o,{numHeads:d,kvNumHeads:f,scale:h,softcap:b,doRotary:k,rotaryInterleaved:A,smoothSoftmax:R,localWindowSize:q})},1138945:(o,d,f,h)=>{t.ic("LayerNormalization",o,{axis:d,epsilon:f,simplified:!!h})},1139056:(o,d,f,h)=>{t.ic("LayerNormalization",o,{axis:d,epsilon:f,simplified:!!h})},1139167:(o,d,f,h,b,k)=>{t.ic("MatMulNBits",o,{k:d,n:f,accuracyLevel:h,bits:b,blockSize:k})},1139294:(o,d,f,h,b,k)=>{t.ic("MultiHeadAttention",o,{numHeads:d,isUnidirectional:f,maskFilterValue:h,scale:b,doRotary:k})},1139453:(o,d)=>{t.ic("QuickGelu",o,{alpha:d})},1139517:(o,d,f,h,b)=>{t.ic("RotaryEmbedding",o,{interleaved:!!d,numHeads:f,rotaryEmbeddingDim:h,scale:b})},1139656:(o,d,f)=>{t.ic("SkipLayerNormalization",o,{epsilon:d,simplified:!!f})},1139758:(o,d,f)=>{t.ic("SkipLayerNormalization",o,{epsilon:d,simplified:!!f})},1139860:(o,d,f,h)=>{t.ic("GatherBlockQuantized",o,{gatherAxis:d,quantizeAxis:f,blockSize:h})},1139981:o=>{t.Qd(o)},1140015:(o,d)=>t.Sd(Number(o),Number(d),t.hd.Vd,t.hd.errors)};function $g(o,d,f){return is(async()=>{await t.Od(Number(o),Number(d),Number(f))})}function bg(){return typeof wasmOffsetConverter<"u"}function vg(o,d,f,h){var b=ue();try{return qs(o,d,f,h)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function xg(o,d,f){var h=ue();try{return Ps(o,d,f)}catch(b){if(oe(h),b!==b+0)throw b;le(1,0)}}function Sg(o){var d=ue();try{Ms(o)}catch(f){if(oe(d),f!==f+0)throw f;le(1,0)}}function kg(o,d){var f=ue();try{return bi(o,d)}catch(h){if(oe(f),h!==h+0)throw h;le(1,0)}}function Tg(o,d,f){var h=ue();try{Os(o,d,f)}catch(b){if(oe(h),b!==b+0)throw b;le(1,0)}}function Ig(o,d,f,h){var b=ue();try{return Fs(o,d,f,h)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function Eg(o,d){var f=ue();try{Ws(o,d)}catch(h){if(oe(f),h!==h+0)throw h;le(1,0)}}function Cg(o,d,f,h,b,k,A){var R=ue();try{return Ls(o,d,f,h,b,k,A)}catch(q){if(oe(R),q!==q+0)throw q;le(1,0)}}function zg(o,d,f,h,b,k){var A=ue();try{Bs(o,d,f,h,b,k)}catch(R){if(oe(A),R!==R+0)throw R;le(1,0)}}function Ag(o,d,f,h){var b=ue();try{Ds(o,d,f,h)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function Og(o,d,f,h,b){var k=ue();try{Us(o,d,f,h,b)}catch(A){if(oe(k),A!==A+0)throw A;le(1,0)}}function Bg(o,d,f,h,b,k,A){var R=ue();try{Gs(o,d,f,h,b,k,A)}catch(q){if(oe(R),q!==q+0)throw q;le(1,0)}}function Rg(o,d,f,h,b,k,A){var R=ue();try{Hs(o,d,f,h,b,k,A)}catch(q){if(oe(R),q!==q+0)throw q;le(1,0)}}function Dg(o,d,f,h,b,k,A,R){var q=ue();try{Qs(o,d,f,h,b,k,A,R)}catch(G){if(oe(q),G!==G+0)throw G;le(1,0)}}function Ng(o,d,f,h,b){var k=ue();try{return Vs(o,d,f,h,b)}catch(A){if(oe(k),A!==A+0)throw A;le(1,0)}}function Mg(o,d,f){var h=ue();try{return Ns(o,d,f)}catch(b){if(oe(h),b!==b+0)throw b;le(1,0)}}function Ug(o,d,f,h,b,k,A,R){var q=ue();try{Xs(o,d,f,h,b,k,A,R)}catch(G){if(oe(q),G!==G+0)throw G;le(1,0)}}function Pg(o,d,f,h,b,k,A,R,q,G,ae,pe){var ge=ue();try{js(o,d,f,h,b,k,A,R,q,G,ae,pe)}catch(_e){if(oe(ge),_e!==_e+0)throw _e;le(1,0)}}function Lg(o,d,f){var h=ue();try{return Ys(o,d,f)}catch(b){if(oe(h),b!==b+0)throw b;return le(1,0),0n}}function qg(o,d,f,h,b,k,A,R,q){var G=ue();try{Rs(o,d,f,h,b,k,A,R,q)}catch(ae){if(oe(G),ae!==ae+0)throw ae;le(1,0)}}function Wg(o){var d=ue();try{return Js(o)}catch(f){if(oe(d),f!==f+0)throw f;le(1,0)}}function Vg(o,d){var f=ue();try{return mo(o,d)}catch(h){if(oe(f),h!==h+0)throw h;return le(1,0),0n}}function Gg(o,d,f,h){var b=ue();try{return eo(o,d,f,h)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function Hg(o,d,f,h,b,k,A){var R=ue();try{go(o,d,f,h,b,k,A)}catch(q){if(oe(R),q!==q+0)throw q;le(1,0)}}function Fg(o){var d=ue();try{return to(o)}catch(f){if(oe(d),f!==f+0)throw f;return le(1,0),0n}}function jg(o,d,f,h,b){var k=ue();try{return oo(o,d,f,h,b)}catch(A){if(oe(k),A!==A+0)throw A;le(1,0)}}function Kg(o,d,f,h,b,k){var A=ue();try{return uo(o,d,f,h,b,k)}catch(R){if(oe(A),R!==R+0)throw R;le(1,0)}}function Zg(o,d,f,h,b,k){var A=ue();try{return Ks(o,d,f,h,b,k)}catch(R){if(oe(A),R!==R+0)throw R;le(1,0)}}function Qg(o,d,f,h,b,k){var A=ue();try{return lo(o,d,f,h,b,k)}catch(R){if(oe(A),R!==R+0)throw R;le(1,0)}}function Xg(o,d,f,h,b,k,A,R){var q=ue();try{return Zs(o,d,f,h,b,k,A,R)}catch(G){if(oe(q),G!==G+0)throw G;le(1,0)}}function Yg(o,d,f,h,b){var k=ue();try{return po(o,d,f,h,b)}catch(A){if(oe(k),A!==A+0)throw A;return le(1,0),0n}}function Jg(o,d,f,h){var b=ue();try{return co(o,d,f,h)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function e0(o,d,f,h){var b=ue();try{return ho(o,d,f,h)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function t0(o,d,f,h,b,k,A,R,q,G,ae,pe){var ge=ue();try{return fo(o,d,f,h,b,k,A,R,q,G,ae,pe)}catch(_e){if(oe(ge),_e!==_e+0)throw _e;le(1,0)}}function r0(o,d,f,h,b,k,A,R,q,G,ae){var pe=ue();try{ao(o,d,f,h,b,k,A,R,q,G,ae)}catch(ge){if(oe(pe),ge!==ge+0)throw ge;le(1,0)}}function i0(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e,mt,xi){var o0=ue();try{so(o,d,f,h,b,k,A,R,q,G,ae,pe,ge,_e,mt,xi)}catch(Si){if(oe(o0),Si!==Si+0)throw Si;le(1,0)}}function n0(o,d,f){var h=ue();try{return ro(o,d,f)}catch(b){if(oe(h),b!==b+0)throw b;le(1,0)}}function a0(o,d,f){var h=ue();try{return io(o,d,f)}catch(b){if(oe(h),b!==b+0)throw b;le(1,0)}}function s0(o,d,f,h){var b=ue();try{no(o,d,f,h)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function Er(){if(0<Ye)$e=Er;else if(n)v?.(t),F();else{for(var o=ke;0<o.length;)o.shift()(t);0<Ye?$e=Er:(t.calledRun=!0,C||(F(),v?.(t)))}}return n||(at=await Ve(),Er()),t.PTR_SIZE=4,U?t:new Promise((o,d)=>{v=o,S=d})}var Cp,xo,A0=M(()=>{"use strict";Cp=vo,xo=globalThis.self?.name?.startsWith("em-pthread"),xo&&vo()}),Oi,zn,So,De,zp,zr,ko,To,Bi,Io,Ri,Ap,Di,Op,Yn=M(()=>{"use strict";Xn(),Oi=typeof location>"u"?void 0:location.origin,zn=import.meta.url>"file:"&&import.meta.url<"file;",So=()=>{if(zn){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Oi).href}return import.meta.url},De=So(),zp=()=>{if(De&&!De.startsWith("blob:"))return De.substring(0,De.lastIndexOf("/")+1)},zr=(e,t)=>{try{let r=t??De;return(r?new URL(e,r):new URL(e)).origin===Oi}catch{return!1}},ko=(e,t)=>{let r=t??De;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},To=(e,t)=>`${t??"./"}${e}`,Bi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Io=async e=>(await import(e)).default,Ri=(z0(),mr(Tp)).default,Ap=async()=>{if(!De)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(zr(De))return[void 0,Ri()];let e=await Bi(De);return[e,Ri(e)]},Di=(A0(),mr(Ep)).default,Op=async(e,t,r,i)=>{let n=Di&&!(e||t);if(n)if(De)n=zr(De)||i&&!r;else if(i&&!r)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,Di];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??ko(a,t),u=r&&s&&!zr(s,t),l=u?await Bi(s):s??To(a,t);return[u?l:void 0,await Io(l)]}}}),Ni,Ar,er,Mi,Eo,Co,zo,Jn,me,Ut=M(()=>{"use strict";Yn(),Ar=!1,er=!1,Mi=!1,Eo=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Co=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},zo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Jn=async e=>{if(Ar)return Promise.resolve();if(er)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Mi)throw new Error("previous call to 'initializeWebAssembly()' failed.");er=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!zo())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Co())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Eo();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,a=typeof n=="string"?n:void 0,s=n?.mjs,u=s?.href??s,l=n?.wasm,p=l?.href??l,c=e.wasmBinary,[m,g]=await Op(u,a,r>1,!!c||!!p),_=!1,y=[];if(t>0&&y.push(new Promise(v=>{setTimeout(()=>{_=!0,v()},t)})),y.push(new Promise((v,S)=>{let $={numThreads:r};if(c)$.wasmBinary=c,$.locateFile=w=>w;else if(p||a)$.locateFile=w=>p??a+w;else if(u&&u.indexOf("blob:")!==0)$.locateFile=w=>new URL(w,u).href;else if(m){let w=zp();w&&($.locateFile=T=>w+T)}g($).then(w=>{er=!1,Ar=!0,Ni=w,v(),m&&URL.revokeObjectURL(m)},w=>{er=!1,Mi=!0,S(w)})})),await Promise.race(y),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},me=()=>{if(Ar&&Ni)return Ni;throw new Error("WebAssembly is not initialized yet.")}}),Qe,jr,he,ea=M(()=>{"use strict";Ut(),Qe=(e,t)=>{let r=me(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},jr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,a])=>{let s=t?t+n:n;if(typeof a=="object")jr(a,s+".",r,i);else if(typeof a=="string"||typeof a=="number")i(s,a.toString());else if(typeof a=="boolean")i(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},he=e=>{let t=me(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let a=Number(t.getValue(n,i===4?"i32":"i64")),s=t.getValue(n+i,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),Bp,O0=M(()=>{"use strict";Ut(),ea(),Bp=(e,t)=>{let r=me(),i=0,n=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;e?.tag!==void 0&&(s=Qe(e.tag,n)),i=r._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),i===0&&he("Can't create run options."),e?.extra!==void 0&&jr(e.extra,"",new WeakSet,(u,l)=>{let p=Qe(u,n),c=Qe(l,n);r._OrtAddRunConfigEntry(i,p,c)!==0&&he(`Can't set a run config entry: ${u} - ${l}.`)});for(let u of t)r._OrtRunOptionsAddActiveLoraAdapter(i,u)!==0&&he("Can't add an active LoRA adapter.");return[i,n]}catch(s){throw i!==0&&r._OrtReleaseRunOptions(i),n.forEach(u=>r._free(u)),s}}}),Ao,Oo,Bo,St,Ro,Rp,B0=M(()=>{"use strict";Ut(),ea(),Ao=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Oo=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Bo=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},St=(e,t,r,i)=>{let n=Qe(t,i),a=Qe(r,i);me()._OrtAddSessionConfigEntry(e,n,a)!==0&&he(`Can't set a session config entry: ${t} - ${r}.`)},Ro=async(e,t,r)=>{let i=t.executionProviders;for(let n of i){let a=typeof n=="string"?n:n.name,s=[],u;switch(a){case"webnn":if(a="WEBNN",St(e,"session.disable_quant_qdq","1",r),St(e,"session.disable_qdq_constant_folding","1",r),typeof n!="string"){let g=n?.deviceType;g&&St(e,"deviceType",g,r)}break;case"webgpu":if(a="JS",typeof n!="string"){let g=n;if(g?.preferredLayout){if(g.preferredLayout!=="NCHW"&&g.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${g.preferredLayout}`);St(e,"preferredLayout",g.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let l=s.length,p=0,c=0;if(l>0){p=me()._malloc(l*me().PTR_SIZE),r.push(p),c=me()._malloc(l*me().PTR_SIZE),r.push(c);for(let g=0;g<l;g++)me().setValue(p+g*me().PTR_SIZE,s[g][0],"*"),me().setValue(c+g*me().PTR_SIZE,s[g][1],"*")}let m;if(u===void 0){let g=Qe(a,r);m=await me()._OrtAppendExecutionProvider(e,g,p,c,l)}m!==0&&he(`Can't append execution provider: ${a}.`)}},Rp=async e=>{let t=me(),r=0,i=[],n=e||{};Bo(n);try{let a=Ao(n.graphOptimizationLevel??"all"),s=Oo(n.executionMode??"sequential"),u=typeof n.logId=="string"?Qe(n.logId,i):0,l=n.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let p=n.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let c=typeof n.optimizedModelFilePath=="string"?Qe(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(a,!!n.enableCpuMemArena,!!n.enableMemPattern,s,!!n.enableProfiling,0,u,l,p,c),r===0&&he("Can't create session options."),n.executionProviders&&await Ro(r,n,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);St(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[m,g]of Object.entries(n.freeDimensionOverrides)){if(typeof m!="string")throw new Error(`free dimension override name must be a string: ${m}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let _=Qe(m,i);t._OrtAddFreeDimensionOverride(r,_,g)!==0&&he(`Can't set a free dimension override: ${m} - ${g}.`)}return n.extra!==void 0&&jr(n.extra,"",new WeakSet,(m,g)=>{St(r,m,g,i)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&he("Can't release session options."),i.forEach(s=>t._free(s)),a}}}),At,lt,Ot,ei,Kr,ta,ra,An,ee=M(()=>{"use strict";At=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},lt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Ot=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,a)=>n*a,1);return r>0?Math.ceil(i*r):void 0},ei=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Kr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},ta=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",ra=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",An=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),ti,ia=M(()=>{"use strict";Xn(),ti=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),a;try{a=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let s=0;for(;;){let{done:u,value:l}=await n.read();if(u)break;let p=l.byteLength;new Uint8Array(a,s,p).set(l),s+=p}return new Uint8Array(a,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Do,No,Mo,Uo,na,Po,de,dt=M(()=>{"use strict";ee(),Do=["V","I","W","E","F"],No=(e,t)=>{console.log(`[${Do[e]},${new Date().toISOString()}]${t}`)},na=(e,t)=>{Mo=e,Uo=t},Po=(e,t)=>{let r=Kr(e),i=Kr(Mo);r>=i&&No(r,typeof t=="function"?t():t)},de=(...e)=>{Uo&&Po(...e)}}),Lo,Ft,B,Zr,Dp,Np,Mp,re=M(()=>{"use strict";Lo=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Ft=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(r){if(i<2||n<2)return;let u=Lo.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=r?3:1;u<=a;u++){let l=i-u<0?1:e[i-u],p=n-u<0?1:t[n-u];if(l!==p&&l>1&&p>1)return;let c=Math.max(l,p);if(l&&p)s[a-u]=Math.max(l,p);else{if(c>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},B=class Gr{static size(t){return Gr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),a=i-1;for(;a>=0;){if(t[a]%r===0){n[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");n[a]=1,r/=t[a],a--}for(a--;a>=0;a--)n[a]=t[a];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Gr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Gr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let a=r;a<i;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[a])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,a)=>n+r[a]+r[a+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},Zr=class _t{static adjustPoolAttributes(t,r,i,n,a,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=i[u]||s[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,a,s,u){if(u){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)_t.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],i[l],n[l],a,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,n,a,s,u,l=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let p=[r[0],r[1]];return _t.computeShapeHelper(t,r,p,i,n,a,s,u,l),p}static computeConvOutputShape(t,r,i,n,a,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return _t.computeShapeHelper(!1,t,l,i,n,a,s,u),l}static computeShapeHelper(t,r,i,n,a,s,u,l,p=0){if(t)for(let c=0;c<r.length-2;c++)i.push(1);else for(let c=0;c<r.length-2;c++)i.push(_t.adjustPadAndReturnShape(r[c+2],n[c],a[c],s[c],u,c,c+r.length-2,l,p))}static computeOutputSize(t,r,i,n,a){let s=Math.floor(t/r)+1;return a===1&&(s=Math.ceil(t/r)+1,(s-1)*r>=i+n&&(s-=1)),s}static adjustPadAndReturnShape(t,r,i,n,a,s,u,l,p=0){let c=i*(n-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[u]=0,_t.computeOutputSize(t-c,r,t,0,p);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let m=(Math.floor((t+r-1)/r)-1)*r+n-t;return a[s]=Math.floor(l==="SAME_LOWER"?(m+1)/2:m/2),a[u]=m-a[s],_t.computeOutputSize(t+a[s]+a[u]-c,r,t,a[s],p)}default:throw new Error("Unsupported AutoPad type")}else return _t.computeOutputSize(t+a[s]+a[u]-c,r,t,a[s],p)}},Dp=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let a,s,u;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(n&&!Ft.isValidBroadcast(n,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},Np=-34028234663852886e22,Mp=34028234663852886e22}),aa,Up=M(()=>{"use strict";ee(),aa=(e,t)=>new(ei(t))(e)}),Ui,qo,Pi,Wo,Li,Vo,qi,Wi,Vi,Go,Pp,R0=M(()=>{"use strict";ee(),dt(),Ui=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),qo=(e,t)=>{if(t==="int32")return e;let r=Ui.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,a=new(ei(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let s=new Int32Array(n);for(let u=0;u<n;u++){let l=a[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Pi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Wo=1,Li=()=>Wo++,Vo=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),qi=(e,t)=>{let r=Ui.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},Wi=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return qi(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Pi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return new Uint8Array(r).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},Vi=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!a?.input.dataTypes.includes(t)){if(s=Vo.get(t),!s||!a?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==qi(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=qo(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Pi(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Go=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Li();return this.tensorTrackersById.set(e,new Vi(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),a=Li(),s=new Wi({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(a,new Vi(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,r,i,n,a,s){let u=this.getMLContext(e);for(let[p,c]of this.freeTensors.entries())if(c.canReuseTensor(u,t,r)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let m=this.freeTensors.splice(p,1)[0];return m.sessionId=e,m}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:n,readable:a});return new Wi({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Pp=(...e)=>new Go(...e)}),tr,Ho,Lp,D0=M(()=>{"use strict";ee(),Ut(),Up(),R0(),dt(),tr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Ho=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,a)=>n===i[a]&&e[n]===t[n])},Lp=class{constructor(e){this.tensorManager=Pp(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,na(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Ho(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let a=tr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,i,n)}async createTemporaryTensor(e,t,r){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=tr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!me().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return aa(r,t)}}registerMLTensor(e,t,r,i){let n=tr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.registerTensor(e,t,n,i);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${a}}`),a}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=tr.get(At(t)),n=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!n?.input.dataTypes.includes(i):!!n?.output.dataTypes.includes(i)}flush(){}}}),sa=M(()=>{"use strict"}),Gi,Or,Br,Fo,jo,Hi,On,Ko,qp,N0=M(()=>{"use strict";dt(),sa(),Gi=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Or=[],Br=e=>Math.ceil(Number(e)/16)*16,Fo=e=>{for(let t=0;t<Or.length;t++){let r=Or[t];if(e<=r)return r}return Math.ceil(e/16)*16},jo=1,Hi=()=>jo++,On=async(e,t,r,i)=>{let n=Br(r),a=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,n),e.flush(),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{a.destroy()}},Ko=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Gi)Or.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,a=Br(n),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${n}`);if(a===n&&i%4===0)this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,r,i,n);else{let u=new Uint8Array(a);u.set(t),this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,u,0,a)}de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Br(r.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=Hi();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Fo(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||a){let u=(n?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:Hi(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await On(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Gi.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},qp=(...e)=>new Ko(...e)}),Zo,fe,xe=M(()=>{"use strict";Zo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},fe=e=>new Zo(e)}),jt,Rr,Ce,Ee,Z,ve,Bn,Ht,wt,K,rr,D,j,Wp,oa,Qo,Vp,ie=M(()=>{"use strict";ee(),re(),jt=64,Rr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ce=(e,t=1)=>{let r=Rr(e,t);return typeof r=="string"?r:r[0]},Ee=(e,t=1)=>{let r=Rr(e,t);return typeof r=="string"?r:r[1]},Z=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:B.computeStrides(r)})}),t},ve=e=>e%4===0?4:e%2===0?2:1,Bn=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Ht=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,wt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,rr=(e,t,r,i,n)=>{let a=typeof r=="number",s=a?r:r.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=Rr(t,n),c=typeof p=="string"?p:p[1],m=typeof p=="string"?p:p[0],g={indices:l,value:c,storage:m,tensor:t},_=U=>typeof U=="string"?U:`${U}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},v=a?"uniforms.":"",S=`${v}${e}_shape`,$=`${v}${e}_strides`,w="";for(let U=0;U<s-1;U++)w+=`
    let dim${U} = current / ${K($,U,s)};
    let rest${U} = current % ${K($,U,s)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;w+=`indices[${s-1}] = current;`;let T=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,I=U=>(y.offsetToIndices=!0,s<2?U:`o2i_${e}(${U})`),E=[];if(s>=2)for(let U=s-1;U>=0;U--)E.push(`${K($,U,s)} * (indices[${U}])`);let C=s<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${E.join("+")};
  }`,z=U=>(y.indicesToOffset=!0,s<2?U:`i2o_${e}(${U})`),x=(...U)=>s===0?"0u":`${g.indices}(${U.map(_).join(",")})`,N=(U,H)=>s<2?`${U}`:`${K(U,H,s)}`,L=(U,H,F)=>s<2?`${U}=${F};`:`${K(U,H,s)}=${F};`,X={},Q=(U,H)=>{y.broadcastedIndicesToOffset=!0;let F=`${H.name}broadcastedIndicesTo${e}Offset`;if(F in X)return`${F}(${U})`;let V=[];for(let Se=s-1;Se>=0;Se--){let Ve=H.indicesGet("outputIndices",Se+H.rank-s);V.push(`${N($,Se)} * (${Ve} % ${N(S,Se)})`)}return X[F]=`fn ${F}(outputIndices: ${H.type.indices}) -> u32 {
             return ${V.length>0?V.join("+"):"0u"};
           }`,`${F}(${U})`},J=(U,H)=>(()=>{if(g.storage===g.value)return`${e}[${U}]=${H};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${H}), select(0u, 0xFFFFFFFFu, ${H} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${H}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${H}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),O=U=>(()=>{if(g.storage===g.value)return`${e}[${U}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${U}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${U}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),W=s<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${c} {
    return ${O(`i2o_${e}(indices)`)};
  }`,Y=s<2?"":(()=>{let U=u.map(F=>`d${F}: u32`).join(", "),H=u.map(F=>`d${F}`).join(", ");return`
  fn get_${e}(${U}) -> ${c} {
    return get_${e}ByIndices(${x(H)});
  }`})(),P=(...U)=>{if(U.length!==s)throw new Error(`indices length must be ${s}`);let H=U.map(_).join(",");return s===0?O("0u"):s===1?O(H[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${H})`)},se=U=>s<2?O(U):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${U})`),ne=s<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${c}) {
    ${J(`i2o_${e}(indices)`,"value")}
  }`,te=s<2?"":(()=>{let U=u.map(F=>`d${F}: u32`).join(", "),H=u.map(F=>`d${F}`).join(", ");return`
  fn set_${e}(${U}, value: ${c}) {
    set_${e}ByIndices(${x(H)}, value);
  }`})();return{impl:()=>{let U=[],H=!1;return y.offsetToIndices&&(U.push(T),H=!0),y.indicesToOffset&&(U.push(C),H=!0),y.broadcastedIndicesToOffset&&(Object.values(X).forEach(F=>U.push(F)),H=!0),y.set&&(U.push(te),H=!0),y.setByIndices&&(U.push(ne),H=!0),y.get&&(U.push(Y),H=!0),y.getByIndices&&(U.push(W),H=!0),!a&&H&&U.unshift(`const ${S} = ${g.indices}(${r.join(",")});`,`const ${$} = ${g.indices}(${B.computeStrides(r).join(",")});`),U.join(`
`)},type:g,offsetToIndices:I,indicesToOffset:z,broadcastedIndicesToOffset:Q,indices:x,indicesGet:N,indicesSet:L,set:(...U)=>{if(U.length!==s+1)throw new Error(`indices length must be ${s}`);let H=U[s];if(typeof H!="string")throw new Error("value must be string");let F=U.slice(0,s).map(_).join(",");return s===0?J("0u",H):s===1?J(F[0],H):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${F}, ${H})`)},setByOffset:J,setByIndices:(U,H)=>s<2?J(U,H):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${H});`),get:P,getByOffset:O,getByIndices:se,usage:i,name:e,strides:$,shape:S,rank:s}},D=(e,t,r,i=1)=>rr(e,t,r,"input",i),j=(e,t,r,i=1)=>rr(e,t,r,"output",i),Wp=(e,t,r)=>rr(e,t,r,"atomicOutput",1),oa=(e,t,r,i=1)=>rr(e,t,r,"internal",i),Qo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=jt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Vp=(e,t)=>new Qo(e,t)}),Xo,Fi,Yo,Jo,eu,tu,Ue,Gp,Hp,$t=M(()=>{"use strict";ee(),re(),xe(),ie(),Xo=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Fi=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Yo=(e,t)=>B.sortBasedOnPerm(e,Fi(e.length,t)),Jo=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)n+=`a[${e[a]}]=i[${a}];`;return n+="return a;}"},eu=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},tu=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Ue=(e,t)=>{let r=e.dataType,i=e.dims.length,n=Fi(i,t),a=Yo(e.dims,n),s=e.dims,u=a,l=i<2||tu(n,e.dims),p;if(l)return p=y=>{let v=D("input",r,s,4),S=j("output",r,u,4);return`
  ${y.registerUniform("output_size","u32").declareVariables(v,S)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(y/4)}]}},getShaderSource:p};let{newShape:c,newPerm:m}=eu(e.dims,n),g=B.areEqual(m,[2,3,1]),_=B.areEqual(m,[3,1,2]);if(c.length===2||g||_){s=g?[c[0],c[1]*c[2]]:_?[c[0]*c[1],c[2]]:c,u=[s[1],s[0]];let y=16;return p=v=>{let S=D("a",r,s.length),$=j("output",r,u.length);return`
  ${v.registerUniform("output_size","u32").declareVariables(S,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${y+1}>, ${y}>;
  ${v.mainStart([y,y,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${y} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${y}u + local_id.x;
    let input_row = workgroup_id_x * ${y}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${y}u + local_id.x;
    let output_row = workgroup_id_y * ${y}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let v=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/y),y:Math.ceil(u[0]/y)},programUniforms:[{type:12,data:v},...Z(s,u)]}},getShaderSource:p}}return p=y=>{let v=D("a",r,s.length),S=j("output",r,u.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(v,S)}

  ${Jo(n,i,v,S)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Z(s,u)]}},getShaderSource:p}},Gp=(e,t)=>{Xo(e.inputs,t.perm),e.compute(Ue(e.inputs[0],t.perm))},Hp=e=>fe({perm:e.perm})}),ru,iu,nu,au,su,ou,uu,lu,du,pu,He,Fp,jp,Kp,Zp,Qp,Xp,Yp,Jp,ec,tc,M0=M(()=>{"use strict";ee(),re(),ie(),ua(),$t(),ru={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},iu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},nu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},au={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},su=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},ou=(e,t)=>{let r=[],i=e.length;for(let a=0;a<i;a++)t.indexOf(a)===-1&&r.push(e[a]);let n=t.map(a=>e[a]);return[r,n]},uu=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?i.push(e[n++]):i.push(1);return i},lu=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},du=(e,t)=>{let r=[];if(!lu(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},pu=(e,t,r,i,n,a,s)=>{let u=r[0].dims,l=B.size(a),p=B.size(s),c=D("_A",r[0].dataType,u),m=j("output",n,a),g=64;l===1&&(g=256);let _=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,y=v=>`
        ${v.registerUniform("reduceSize","u32").declareVariables(c,m)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${v.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${nu[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${ru[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${iu[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${i==="mean"?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${au[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},He=(e,t,r,i)=>{let n=e.inputs.length===1?r:Rn(e.inputs,r),a=n.axes;a.length===0&&!n.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((_,y)=>y));let s=B.normalizeAxes(a,e.inputs[0].dims.length),u=s,l=e.inputs[0],p=du(u,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Ue(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],u=su(u.length,l.dims.length));let[c,m]=ou(l.dims,u),g=c;n.keepDims&&(g=uu(c,s)),e.compute(pu(t,n.cacheKey,[l],i,e.inputs[0].dataType,g,m),{inputs:[l]})},Fp=(e,t)=>{He(e,"ReduceMeanShared",t,"mean")},jp=(e,t)=>{He(e,"ReduceL1Shared",t,"l1")},Kp=(e,t)=>{He(e,"ReduceL2Shared",t,"l2")},Zp=(e,t)=>{He(e,"ReduceLogSumExpShared",t,"logSumExp")},Qp=(e,t)=>{He(e,"ReduceMaxShared",t,"max")},Xp=(e,t)=>{He(e,"ReduceMinShared",t,"min")},Yp=(e,t)=>{He(e,"ReduceProdShared",t,"prod")},Jp=(e,t)=>{He(e,"ReduceSumShared",t,"sum")},ec=(e,t)=>{He(e,"ReduceSumSquareShared",t,"sumSquare")},tc=(e,t)=>{He(e,"ReduceLogSumShared",t,"logSum")}}),Fe,cu,Qr,Rn,je,hu,fu,mu,gu,yu,_u,wu,$u,bu,vu,Ke,rc,ic,nc,ac,sc,oc,uc,lc,dc,pc,ua=M(()=>{"use strict";ee(),re(),xe(),ie(),M0(),Fe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},cu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Qr=(e,t,r,i,n,a,s=!1,u=!1)=>{let l=[],p=r[0].dims,c=p.length,m=B.normalizeAxes(n,c),g=!u&&m.length===0;p.forEach((v,S)=>{g||m.indexOf(S)>=0?s&&l.push(1):l.push(v)});let _=l.length,y=B.size(l);return{name:e,shaderCache:t,getShaderSource:v=>{let S=[],$=D("_A",r[0].dataType,c),w=j("output",a,_),T=i($,w,m),I=T[2];for(let E=0,C=0;E<c;E++)g||m.indexOf(E)>=0?(s&&C++,I=`for(var j${E}: u32 = 0; j${E} < ${p[E]}; j${E}++) {
                  ${T[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${$.indicesSet("input_indices",E,`j${E}`)}
                  ${I}
                }`):(S.push(`${$.indicesSet("input_indices",E,w.indicesGet("output_indices",C))};`),C++);return`

        ${v.registerUniform("output_size","u32").declareVariables($,w)}

        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${I}
          ${T[3]}
          ${T.length===4?w.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Z(p,l)]})}},Rn=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),fe({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},je=(e,t,r,i)=>{let n=e.inputs,a=n.length===1?r:Rn(n,r);e.compute(Qr(t,{hint:a.cacheKey,inputDependencies:["rank"]},[n[0]],a.noopWithEmptyAxes&&a.axes.length===0?cu:i,a.axes,n[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},hu=(e,t)=>{Fe(e.inputs),je(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},fu=(e,t)=>{Fe(e.inputs),je(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},mu=(e,t)=>{Fe(e.inputs),je(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},gu=(e,t)=>{Fe(e.inputs),je(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},yu=(e,t)=>{Fe(e.inputs),je(e,"ReduceMax",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(r.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},_u=(e,t)=>{Fe(e.inputs),je(e,"ReduceMean",t,(r,i,n)=>{let a=1;for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${a});`]})},wu=(e,t)=>{Fe(e.inputs),je(e,"ReduceMin",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},$u=(e,t)=>{Fe(e.inputs),je(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},bu=(e,t)=>{Fe(e.inputs),je(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},vu=(e,t)=>{Fe(e.inputs),je(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Ke=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?i*=e[a]:n*=e[a];return n<32&&i>1024},rc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_u(e,t):Fp(e,t)},ic=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fu(e,t):jp(e,t)},nc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mu(e,t):Kp(e,t)},ac=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gu(e,t):Zp(e,t)},sc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yu(e,t):Qp(e,t)},oc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wu(e,t):Xp(e,t)},uc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$u(e,t):Yp(e,t)},lc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bu(e,t):Jp(e,t)},dc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vu(e,t):ec(e,t)},pc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hu(e,t):tc(e,t)}}),ji,cc,hc,Dn,U0=M(()=>{"use strict";ee(),xe(),ua(),ji=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},cc=(e,t)=>{ji(e.inputs);let r=(i,n,a)=>{let s=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Qr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},hc=(e,t)=>{ji(e.inputs);let r=(i,n,a)=>{let s=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Qr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Dn=e=>fe(e)}),xu,Dr,Su,ku,Tu,gr,Iu,fc,la=M(()=>{"use strict";ee(),re(),sa(),ie(),xu=(e,t)=>{let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],p=r.dims[1],c=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let m=n.dims[0]/3,g=m,_=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");m=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let y=p;if(m!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==m+g+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let v=0;if(s){if(g!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(v=s.dims[3])}let S=y+v,$=-1,w=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:v,kvSequenceLength:y,totalSequenceLength:S,maxSequenceLength:$,inputHiddenSize:c,hiddenSize:m,vHiddenSize:_,headSize:Math.floor(m/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Dr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Su=(e,t,r,i,n,a,s,u)=>{let l=ve(s?1:a),p=64,c=a/l;c<p&&(p=32);let m=Math.ceil(a/l/p),g=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:c},{type:12,data:m}],_=Ce(e.dataType,l),y=Ee(1,l),v=["type"];s&&v.push("type"),u&&v.push("type");let S=$=>{let w=j("x",e.dataType,e.dims,l),T=[w],I=s?D("seq_lens",s.dataType,s.dims):void 0;I&&T.push(I);let E=u?D("total_sequence_length_input",u.dataType,u.dims):void 0;E&&T.push(E);let C=Ee(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${$.registerUniforms(z).declareVariables(...T)}
  ${$.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Dr(I,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${l}`,inputDependencies:v},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:g})}},ku=(e,t,r,i,n,a,s,u,l)=>{let p=s+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,p],m=e>1&&i,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=m?[a.batchSize,g,p,a.headSize]:void 0,y=a.nReps?a.nReps:1,v=a.scale===0?1/Math.sqrt(a.headSize):a.scale,S=ve(a.headSize),$=a.headSize/S,w=12,T={x:Math.ceil(p/w),y:Math.ceil(a.sequenceLength/w),z:a.batchSize*a.numHeads},I=[{type:12,data:a.sequenceLength},{type:12,data:$},{type:12,data:p},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:v},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:y}],E=m&&i&&B.size(i.dims)>0,C=["type","type"];E&&C.push("type"),n&&C.push("type"),u&&C.push("type"),l&&C.push("type");let z=[{dims:c,dataType:t.dataType,gpuDataType:0}];m&&z.push({dims:_,dataType:t.dataType,gpuDataType:0});let x=N=>{let L=D("q",t.dataType,t.dims,S),X=D("key",r.dataType,r.dims,S),Q=[L,X];if(E){let ne=D("past_key",i.dataType,i.dims,S);Q.push(ne)}n&&Q.push(D("attention_bias",n.dataType,n.dims));let J=u?D("seq_lens",u.dataType,u.dims):void 0;J&&Q.push(J);let O=l?D("total_sequence_length_input",l.dataType,l.dims):void 0;O&&Q.push(O);let W=j("output",t.dataType,c),Y=[W];m&&Y.push(j("present_key",t.dataType,_,S));let P=Ee(1,S),se=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${L.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${L.type.storage}, ${w*w}>;
  ${N.registerUniforms(se).declareVariables(...Q,...Y)}
  ${N.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Dr(J,O,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&m?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${m?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${P}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E&&m?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${m?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${P}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${W.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${n!==void 0};${i!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:z,dispatchGroup:T,programUniforms:I}),getShaderSource:x}},Tu=(e,t,r,i,n,a,s=void 0,u=void 0)=>{let l=a+n.kvSequenceLength,p=n.nReps?n.nReps:1,c=n.vHiddenSize*p,m=e>1&&i,g=n.kvNumHeads?n.kvNumHeads:n.numHeads,_=m?[n.batchSize,g,l,n.headSize]:void 0,y=[n.batchSize,n.sequenceLength,c],v=12,S={x:Math.ceil(n.vHeadSize/v),y:Math.ceil(n.sequenceLength/v),z:n.batchSize*n.numHeads},$=[{type:12,data:n.sequenceLength},{type:12,data:l},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:n.kvSequenceLength},{type:12,data:p}],w=m&&i&&B.size(i.dims)>0,T=["type","type"];w&&T.push("type"),s&&T.push("type"),u&&T.push("type");let I=[{dims:y,dataType:t.dataType,gpuDataType:0}];m&&I.push({dims:_,dataType:t.dataType,gpuDataType:0});let E=C=>{let z=D("probs",t.dataType,t.dims),x=D("v",r.dataType,r.dims),N=[z,x];w&&N.push(D("past_value",i.dataType,i.dims));let L=s?D("seq_lens",s.dataType,s.dims):void 0;s&&N.push(L);let X=u?D("total_sequence_length_input",u.dataType,u.dims):void 0;u&&N.push(X);let Q=[j("output",t.dataType,y)];m&&Q.push(j("present_value",t.dataType,_));let J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;
  var<workgroup> tileQ: array<${z.type.value}, ${v*v}>;
  var<workgroup> tileV: array<${z.type.value}, ${v*v}>;
  ${C.registerUniforms(J).declareVariables(...N,...Q)}
  ${C.mainStart([v,v,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Dr(L,X,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&m?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${m?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&m?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${m?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:I,dispatchGroup:S,programUniforms:$}),getShaderSource:E}},gr=(e,t,r,i,n,a,s,u,l,p,c=void 0,m=void 0)=>{let g=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),_=g>1?s:void 0,y=g>1?u:void 0,v=g>1?p.pastSequenceLength:0,S=v+p.kvSequenceLength,$=l&&B.size(l.dims)>0?l:void 0,w=[t,r];_&&B.size(_.dims)>0&&w.push(_),$&&w.push($),c&&w.push(c),m&&w.push(m);let T=e.compute(ku(g,t,r,_,$,p,v,c,m),{inputs:w,outputs:g>1?[-1,1]:[-1]})[0];e.compute(Su(T,p.batchSize,p.numHeads,v,p.sequenceLength,S,c,m),{inputs:c&&m?[T,c,m]:[T],outputs:[]});let I=[T,i];y&&B.size(y.dims)>0&&I.push(y),c&&I.push(c),m&&I.push(m),e.compute(Tu(g,T,i,y,p,v,c,m),{inputs:I,outputs:g>1?[0,2]:[0]})},Iu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,a=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:i},{type:12,data:n},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=m=>{let g=j("output_q",l[0].dataType,r),_=j("output_k",l[0].dataType,r),y=j("output_v",l[0].dataType,r),v=D("input",l[0].dataType,l[0].dims),S=D("weight",l[1].dataType,l[1].dims),$=D("bias",l[2].dataType,l[2].dims),w=v.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${w}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${w}, ${s*s}>;
  var<workgroup> tileWeightK: array<${w}, ${s*s}>;
  var<workgroup> tileWeightV: array<${w}, ${s*s}>;
  ${m.registerUniforms(T).declareVariables(v,S,$,g,_,y)}
  ${m.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},fc=(e,t)=>{let r=xu(e.inputs,t),[i,n,a]=Iu(e,r);return gr(e,i,n,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Eu,Cu,zu,mc,P0=M(()=>{"use strict";Pe(),ee(),re(),xe(),ie(),Eu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,a)=>{let s=n.length;if(s!==i.length)throw new Error(`${a}: num dimensions != ${s}`);n.forEach((u,l)=>{if(u!==i[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Cu=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,a=e[0].dims,s=i?ve(a[a.length-1]):1,u=n==="NHWC"&&a.length>1?s:1,l=B.size(a)/s,p=i,c=p?a.length:a,m=D("x",e[0].dataType,e[0].dims,s),g=D("scale",e[1].dataType,e[1].dims,u),_=D("bias",e[2].dataType,e[2].dims,u),y=D("inputMean",e[3].dataType,e[3].dims,u),v=D("inputVar",e[4].dataType,e[4].dims,u),S=j("y",e[0].dataType,c,s),$=()=>{let T="";if(i)T=`let cOffset = ${a.length===1?"0u":n==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(n==="NCHW")T=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let I=1;I<g.rank;I++)T+=`cIndices[${I}] = outputIndices[${I}];`;T+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return T},w=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(m,g,_,y,v,S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${s}`)};
    ${$()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${v.getByOffset("cOffset")};
    let x = ${m.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...Z(a)]:[{type:12,data:l}]})}},zu=e=>fe(e),mc=(e,t)=>{let{inputs:r,outputCount:i}=e,n=zu({...t,outputCount:i});if(we.webgpu.validateInputContent&&Eu(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Cu(r,n))}}),Au,Ou,gc,L0=M(()=>{"use strict";re(),ie(),Au=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Ou=e=>{let t=e[0].dims,r=e[0].dims[2],i=B.size(t)/4,n=e[0].dataType,a=D("input",n,t,4),s=D("bias",n,[r],4),u=D("residual",n,t,4),l=j("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(a,s,u,l)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},gc=e=>{Au(e.inputs),e.compute(Ou(e.inputs))}}),Bu,ce,yc,_c,wc,$c,bc,vc,xc,Sc,kc,Ru,Tc,Ic,Ec,Cc,cr,zc,Hr,Ac,Oc,Bc,Rc,Dc,Nc,Mc,Uc,Pc,Lc,qc,Wc,Vc,Gc,Hc,Fc,jc,Ki,Kc,Nn,Mn,Zc,Qc,Xc,Du,Nu,Yc,da=M(()=>{"use strict";ee(),re(),xe(),ie(),Bu=(e,t,r,i,n,a,s)=>{let u=Math.ceil(t/4),l="";typeof n=="string"?l=`${n}(a)`:l=n("a");let p=D("inputData",r,[u],4),c=j("outputData",i,[u],4),m=[{name:"vec_size",type:"u32"}];return s&&m.push(...s),`
      ${e.registerUniforms(m).declareVariables(p,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},ce=(e,t,r,i,n,a=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(B.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:p=>Bu(p,B.size(e.dims),e.dataType,a,r,i,u),getRunData:p=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(B.size(p[0].dims)/64/4)},programUniforms:l})}},yc=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},_c=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},wc=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},$c=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},bc=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},vc=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},xc=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},Sc=e=>fe(e),kc=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Ru=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return fe({min:t,max:r})},Tc=(e,t)=>{let r=t||Ru(e.inputs),i=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Ic=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},Ec=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},Cc=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},cr=e=>fe(e),zc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Hr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Ac=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Hr(t)))},Oc=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},Bc=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},Rc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Hr(t)))},Dc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Nc=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},Mc=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},Uc=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Pc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Lc=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},qc=e=>fe(e),Wc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Vc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},Gc=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},Hc=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},Fc=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},jc=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},Ki=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Kc=e=>{e.compute(ce(e.inputs[0],"Tanh",Ki))},Nn=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ki("v")};
}
`,Mn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Zc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",Mn,Nn(t),void 0,e.inputs[0].dataType))},Qc=(e,t)=>{let r=Ee(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Xc=e=>{e.compute(ce(e.inputs[0],"Log","log"))},Du=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Nu=e=>`quick_gelu_impl(${e})`,Yc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",Nu,Du(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Mu,Uu,Jc,q0=M(()=>{"use strict";re(),ie(),da(),Mu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Uu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=D("input",e[0].dataType,e[0].dims,4),i=D("bias",e[0].dataType,[e[0].dims[2]],4),n=j("output",e[0].dataType,t,4),a=B.size(t)/4,s=Ce(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,n)}

  ${Hr(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Jc=e=>{Mu(e.inputs),e.compute(Uu(e.inputs))}}),Pu,Lu,Ze,eh,th,rh,ih,nh,ah,sh,oh,uh,lh,W0=M(()=>{"use strict";ee(),re(),ie(),Pu=(e,t,r,i,n,a,s,u,l,p,c,m)=>{let g,_;typeof u=="string"?g=_=(w,T)=>`${u}((${w}),(${T}))`:typeof u=="function"?g=_=u:(g=u.scalar,_=u.vector);let y=j("outputData",c,i.length,4),v=D("aData",l,t.length,4),S=D("bData",p,r.length,4),$;if(n)if(a){let w=B.size(t)===1,T=B.size(r)===1,I=t.length>0&&t[t.length-1]%4===0,E=r.length>0&&r[r.length-1]%4===0;w||T?$=y.setByOffset("global_idx",_(w?`${v.type.value}(${v.getByOffset("0")}.x)`:v.getByOffset("global_idx"),T?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):$=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${v.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",_(s||I?v.getByOffset("offsetA / 4u"):`${v.type.value}(${v.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||E?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=y.setByOffset("global_idx",_(v.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(T,I,E="")=>{let C=`aData[indexA${I}][componentA${I}]`,z=`bData[indexB${I}][componentB${I}]`;return`
            let outputIndices${I} = ${y.offsetToIndices(`global_idx * 4u + ${I}u`)};
            let offsetA${I} = ${v.broadcastedIndicesToOffset(`outputIndices${I}`,y)};
            let offsetB${I} = ${S.broadcastedIndicesToOffset(`outputIndices${I}`,y)};
            let indexA${I} = offsetA${I} / 4u;
            let indexB${I} = offsetB${I} / 4u;
            let componentA${I} = offsetA${I} % 4u;
            let componentB${I} = offsetB${I} % 4u;
            ${T}[${I}] = ${E}(${g(C,z)});
          `};c===9?$=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(v,S,y)}

        ${m??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Lu=(e,t,r,i,n,a,s=r.dataType)=>{let u=r.dims.map(Number),l=i.dims.map(Number),p=!B.areEqual(u,l),c=u,m=B.size(u),g=!1,_=!1,y=[p];if(p){let v=Ft.calcShape(u,l,!1);if(!v)throw new Error("Can't perform binary op on the given tensors");c=v.slice(),m=B.size(c);let S=B.size(u)===1,$=B.size(l)===1,w=u.length>0&&u[u.length-1]%4===0,T=l.length>0&&l[l.length-1]%4===0;y.push(S),y.push($),y.push(w),y.push(T);let I=1;for(let E=1;E<c.length;E++){let C=u[u.length-E],z=l[l.length-E];if(C===z)I*=C;else break}I%4===0?(_=!0,g=!0):(S||$||w||T)&&(g=!0)}else g=!0;return y.push(g),{name:e,shaderCache:{hint:t+y.map(v=>v.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:v=>Pu(v,u,l,c,g,p,_,n,r.dataType,i.dataType,s,a),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(B.size(c)/4)},...Z(u,l,c)]})}},Ze=(e,t,r,i,n,a)=>{e.compute(Lu(t,n??"",e.inputs[0],e.inputs[1],r,i,a))},eh=e=>{Ze(e,"Add",(t,r)=>`${t}+${r}`)},th=e=>{Ze(e,"Div",(t,r)=>`${t}/${r}`)},rh=e=>{Ze(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},ih=e=>{Ze(e,"Mul",(t,r)=>`${t}*${r}`)},nh=e=>{let t=D("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ze(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},ah=e=>{Ze(e,"Sub",(t,r)=>`${t}-${r}`)},sh=e=>{Ze(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},oh=e=>{Ze(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},uh=e=>{Ze(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},lh=e=>{Ze(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),qu,Wu,dh,ph,V0=M(()=>{"use strict";ee(),re(),xe(),ie(),qu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,a=i.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==n)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==i.dims[p])throw new Error("non concat dimensions must match")})}})},Wu=(e,t,r,i,n=0)=>{let a=e.reduce(($,w)=>$+B.size(w.dims),0),s=new Array(e.length),u=new Array(e.length),l=new Array(e.length),p=0,c=n,m=[],g=[],_=[{type:12,data:a}];for(let $=0;$<e.length;++$)s[$]=p,u[$]=c,p+=B.size(e[$].dims),c+=e[$].dims[t],g.push(e[$].dims.length),l[$]=D(`input${$}`,i,g[$]),m.push("rank"),_.push({type:12,data:s[$]}),_.push({type:12,data:u[$]});for(let $=0;$<e.length;++$)_.push(...Z(e[$].dims));_.push(...Z(r));let y=j("output",i,r.length),v=l.map(($,w)=>{let T=`
        let inputOffset = ${`global_idx - uniforms.inputOffset${w}`};
        var outputIndices = ${$.offsetToIndices("inputOffset")};
        ${y.indicesGet("outputIndices",t)} += uniforms.outputAxisOffset${w};
        ${y.setByIndices("outputIndices",$.getByOffset("inputOffset"))}`;return e.length===1?T:w===0?`if (inputIndex == 0u) {${T}}`:w===e.length-1?`else {${T}}`:`else if (inputIndex == ${w}u) {${T}}`}).join(`
`),S=$=>`

  ${(()=>{$.registerUniform("outputSize","u32");for(let w=0;w<e.length;w++)$.registerUniform(`inputOffset${w}`,"u32"),$.registerUniform(`outputAxisOffset${w}`,"u32");return $.declareVariables(...l,y)})()}

  fn calculateInputIndex(global_idx: u32) -> u32 {
    ${l.slice(1).map((w,T)=>`if (global_idx < uniforms.inputOffset${T+1}) {
      return ${T}u;
    }`).join(`
`)}
    return ${e.length-1}u;
  }

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    let inputIndex = calculateInputIndex(global_idx);
    ${v}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:_}),getShaderSource:S}},dh=(e,t)=>{let r=e.inputs,i=r[0].dims,n=B.normalizeAxis(t.axis,i.length);qu(r,n);let a=i.slice();a[n]=r.reduce((p,c)=>p+(c.dims.length>n?c.dims[n]:0),0);let s=r.filter(p=>B.size(p.dims)>0);if(s.length===0){e.output(0,a);return}let u=e.deviceLimits.maxStorageBuffersPerShaderStage-1,l=0;for(let p=0;p<s.length;p+=u){let c=s.slice(p,p+u);e.compute(Wu(c,n,a,r[0].dataType,l),{inputs:c,outputs:[0]}),l+=c.reduce((m,g)=>m+g.dims[n],0)}},ph=e=>fe({axis:e.axis})}),Dt,Nt,Mt,pa,Pt=M(()=>{"use strict";ee(),re(),Dt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Nt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Mt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},pa=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Np,Mp];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Be,ch,ca=M(()=>{"use strict";Be=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},ch=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),hh,G0=M(()=>{"use strict";hh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),fr,ha,fa=M(()=>{"use strict";ee(),re(),ie(),Pt(),fr=(e,t,r,i,n)=>{let a=i-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${K(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,K(n,u+a,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},ha=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],p=u[u.length-1],c=s[s.length-1],m=ve(p),g=ve(c),_=ve(l),y=B.size(r)/m/_,v=e.length>2,S=i?i.slice(0,-2):r.slice(0,-2),$=[B.size(S),l,p],w=[{type:12,data:y},{type:12,data:l},{type:12,data:p},{type:12,data:c}];Nt(t,w),w.push(...Z(S,s,u)),v&&w.push(...Z(e[2].dims)),w.push(...Z($));let T=I=>{let E=oa("batch_dims",e[0].dataType,S.length),C=D("a",e[0].dataType,s.length,g),z=D("b",e[1].dataType,u.length,m),x=j("output",e[0].dataType,$.length,m),N=Ce(x.type.tensor),L=Dt(t,x.type.value,N),X=[C,z],Q="";if(v){let W=n?m:1;X.push(D("bias",e[2].dataType,e[2].dims.length,W)),Q=`${n?`value += bias[col / ${W}];`:`value += ${x.type.value}(bias[row + i]);`}`}let J=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Mt(t,J);let O=()=>{let W=`var a_data: ${C.type.value};`;for(let Y=0;Y<g;Y++)W+=`
              let b_data${Y} = b[(b_offset + (k + ${Y}) * uniforms.N + col) / ${m}];`;for(let Y=0;Y<_;Y++){W+=`a_data = a[(a_offset + (row + ${Y}) * uniforms.K + k) / ${g}];`;for(let P=0;P<g;P++)W+=`
            values[${Y}] = fma(${z.type.value}(a_data${g===1?"":`[${P}]`}), b_data${P}, values[${Y}]);
`}return W};return`
  ${I.registerUniforms(J).registerInternalVariables(E).declareVariables(...X,x)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${m})) * ${m};
    var index1 = global_idx / (uniforms.N / ${m});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${fr("a_indices",C,C.rank-2,E.rank,"batch_indices")}
    ${C.indicesSet("a_indices",C.rank-2,0)}
    ${C.indicesSet("a_indices",C.rank-1,0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${fr("b_indices",z,z.rank-2,E.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${x.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${O()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${Q}
      ${L}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${m}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${m};${g};${_};${n}`,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:w}),getShaderSource:T}}}),Vu,Gu,Un,Zi,Hu,Pn,Fu,Xr,ma=M(()=>{"use strict";ee(),re(),ie(),Pt(),fa(),ca(),Vu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Gu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Un=(e,t,r="f32",i,n=!1,a=32,s=!1,u=32)=>{let l=t[1]*e[1],p=t[0]*e[0],c=n?l:a,m=n?a:l,g=c/t[0],_=a/t[1];if(!((n&&g===4&&e[1]===4||!n&&(g===3||g===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${c/g}>, ${m}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Vu(n,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Gu(n,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Zi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Hu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Pn=(e,t,r="f32",i,n=!1,a=32,s=!1,u=32,l=!1)=>{let p=e[1]*t[1],c=e[0]*t[0],m=n?p:a,g=n?a:p;if(!(g%t[1]===0&&m%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let _=g/t[1],y=m/t[0],v=a/t[1],S=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
          ${Zi(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${v};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Zi(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${v}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Hu(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${m}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`},Fu=(e,t,r,i,n=!1)=>{let[a,s,u,l]=i,p=Ce(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Be(e,p)} {
      var value = ${Be(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${fr("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Be(e,p)} {
      var value = ${Be(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${fr("bIndices",u,u.rank-2,a.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Be(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${Be(e,p)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Xr=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),p=u.slice(0,-2),c=i?i.slice(0,-2):r.slice(0,-2),m=B.size(c),g=s[s.length-2],_=s[s.length-1],y=u[u.length-1],v=_%4===0&&y%4===0,S=g<=8?[4,1,1]:[4,4,1],$=[8,8,1],w=[Math.ceil(y/$[0]/S[0]),Math.ceil(g/$[1]/S[1]),Math.ceil(m/$[2]/S[2])],T=v?4:1,I=[...l,g,_/T],E=I.length,C=[...p,_,y/T],z=C.length,x=[m,g,y/T],N=[{type:6,data:g},{type:6,data:y},{type:6,data:_}];Nt(t,N),N.push(...Z(c,I,C));let L=["rank","rank"],X=e.length>2;X&&(N.push(...Z(e[2].dims)),L.push("rank")),N.push(...Z(x));let Q=J=>{let O=c.length,W=oa("batchDims",e[0].dataType,O,1),Y=Ce(e[0].dataType),P=D("a",e[0].dataType,E,T),se=D("b",e[1].dataType,z,T),ne=j("result",e[0].dataType,x.length,T),te=[P,se];if(X){let Se=n?T:1;te.push(D("bias",e[2].dataType,e[2].dims.length,Se))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Mt(t,U);let H=Ce(ne.type.tensor),F=Dt(t,ne.type.value,H),V=Fu(T,X,F,[W,P,se,ne],n);return`
  ${J.registerUniforms(U).registerInternalVariables(W).declareVariables(...te,ne)}
  ${V}
  ${v?Un(S,$,Y,W):Pn(S,$,Y,W)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${v};${n}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:N}),getShaderSource:Q}}}),ju,fh,H0=M(()=>{"use strict";ee(),dt(),ie(),Pt(),ca(),G0(),ma(),ju=(e,t,r,i,n=!1,a,s=4,u=4,l=4,p="f32")=>{let c=N=>{switch(N){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},m=N=>{switch(N){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},g=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",v=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",$=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Be(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${v}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,T=e?t&&i?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Be(s,p)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Be(s,p)}(0.0);`,I=e?i&&r?m(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m(u)}
    }
    return ${Be(u,p)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${m(u)}
    }
    return ${Be(u,p)}(0.0);`,E=Be(l,p),C=Be(e?s:u,p),z=Be(e?u:s,p),x=Dt(a,E,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?T:I}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?I:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${ch(n)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},fh=(e,t,r,i,n,a,s,u,l)=>{let p=t.format==="NHWC",c=p?e[0].dims[3]:e[0].dims[1],m=r[0],g=p?r[2]:r[3],_=p?r[1]:r[2],y=p?r[3]:r[1],v=p&&(c%4===0||c%3===0)&&y%4===0,S=p?y:g*_,$=p?g*_:y,w=[8,8,1],T=i<=8?[4,1,1]:[4,4,1],I=[Math.ceil(S/w[0]/T[0]),Math.ceil($/w[1]/T[1]),Math.ceil(m/w[2]/T[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${I}`);let E=v?p&&c%4!==0?3:4:1,C=w[1]*T[1],z=w[0]*T[0],x=Math.max(w[0]*E,w[1]),N=i%C===0,L=n%z===0,X=a%x===0,Q=v?[E,4,4]:[1,1,1],J=[{type:6,data:i},{type:6,data:n},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Nt(t,J),J.push(...Z(e[0].dims,e[1].dims));let O=["rank","rank"];s&&(J.push(...Z(e[2].dims)),O.push("rank")),J.push(...Z(r));let W=Y=>{let P=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Mt(t,P);let se=v?4:1,ne=Ce(e[0].dataType),te=`
      fn setOutputAtIndex(flatIndex : i32, value : ${v?`vec4<${ne}>`:ne}) {
        result[flatIndex] = ${v?`vec4<${ne}>`:ne}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${v?`vec4<${ne}>`:ne}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${v?"/ 4":""}, value);
      }`,U=D("x",e[0].dataType,e[0].dims.length,E===3?1:E),H=D("w",e[1].dataType,e[1].dims.length,se),F=[U,H],V=j("result",e[0].dataType,r.length,se);if(s){let Se=D("bias",e[2].dataType,e[2].dims.length,se);F.push(Se),te+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${v?`vec4<${ne}>`:ne} {
          return bias[coords.${p?"w":"y"}${v?"/ 4":""}];
        }`}return`
        ${hh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Y.registerUniforms(P).declareVariables(...F,V)}
        ${te}
        ${ju(p,N,L,X,s,t,Q[0],Q[1],Q[2],ne)}
        ${v?Un(T,w,ne,void 0,!p,x):Pn(T,w,ne,void 0,!p,x,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${v};${N};${L};${X};${C};${z};${x}`,inputDependencies:O},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:I[0],y:I[1],z:I[2]},programUniforms:J}),getShaderSource:W}}}),Ku,Qi,ir,Zu,Xi,Qu,mh,gh,F0=M(()=>{"use strict";ee(),dt(),re(),ie(),Pt(),ca(),Ku=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Qi=e=>typeof e=="number"?[e,e,e]:e,ir=(e,t)=>t<=1?e:e+(e-1)*(t-1),Zu=(e,t,r,i=1)=>{let n=ir(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},Xi=(e,t,r,i,n)=>{n==null&&(n=Zu(e,t[0],i[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*n>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*n)/i[s]+1));return a},Qu=(e,t,r,i,n,a,s,u,l,p)=>{let c,m,g,_;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=Xi([t,r,i,1],[u,l,p],1,[n,a,s],e);m=y[0],g=y[1],_=y[2]}else if(Array.isArray(e)){if(!e.every((v,S,$)=>v===$[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=Xi([t,r,i,1],[u,l,p],1,[n,a,s],e[0]);m=y[0],g=y[1],_=y[2]}else if(e==="SAME_UPPER"){m=Math.ceil(t/n),g=Math.ceil(r/a),_=Math.ceil(i/s);let y=(m-1)*n+u-t,v=(g-1)*a+l-r,S=(_-1)*s+p-i,$=Math.floor(y/2),w=y-$,T=Math.floor(v/2),I=v-T,E=Math.floor(S/2),C=S-E;c={top:T,bottom:I,left:E,right:C,front:$,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:m,outHeight:g,outWidth:_}},mh=(e,t,r,i,n,a=!1,s="channelsLast")=>{let u,l,p,c,m;if(s==="channelsLast")[u,l,p,c,m]=e;else if(s==="channelsFirst")[u,m,l,p,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[g,,_,y,v]=t,[S,$,w]=Qi(r),[T,I,E]=Qi(i),C=ir(_,T),z=ir(y,I),x=ir(v,E),{padInfo:N,outDepth:L,outHeight:X,outWidth:Q}=Qu(n,l,p,c,S,$,w,C,z,x),J=a?g*m:g,O=[0,0,0,0,0];return s==="channelsFirst"?O=[u,J,L,X,Q]:s==="channelsLast"&&(O=[u,L,X,Q,J]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:p,inWidth:c,inChannels:m,outDepth:L,outHeight:X,outWidth:Q,outChannels:J,padInfo:N,strideDepth:S,strideHeight:$,strideWidth:w,filterDepth:_,filterHeight:y,filterWidth:v,effectiveFilterDepth:C,effectiveFilterHeight:z,effectiveFilterWidth:x,dilationDepth:T,dilationHeight:I,dilationWidth:E,inShape:e,outShape:O,filterShape:t}},gh=(e,t,r,i,n,a)=>{let s=a==="channelsLast",u=s?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],c={x:r.map((w,T)=>T)},m=[Math.ceil(Ku(c.x.map(w=>r[w]))/p[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${m}`);let g=l?s&&u%4!==0?3:4:1,_=B.size(r),y=[{type:12,data:_},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Nt(t,y),y.push(...Z(e[0].dims,e[1].dims));let v=["rank","rank"],S=e.length===3;S&&(y.push(...Z(e[2].dims)),v.push("rank")),y.push(...Z(r));let $=w=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Mt(t,T);let I=l?4:1,E=Ce(e[0].dataType),C=D("x",e[0].dataType,e[0].dims.length,g===3?1:g),z=D("W",e[1].dataType,e[1].dims.length,I),x=[C,z],N=j("result",e[0].dataType,r.length,I),L="";if(S){let J=D("bias",e[2].dataType,e[2].dims.length,I);x.push(J),L+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${E}>`:E} {
          return bias[${s?K("coords",4,5):K("coords",1,5)}${l?"/ 4":""}];
        }`}let X=Be(g,E),Q=Dt(t,X,E);return`
            ${L}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${E} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${E} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${z.getByIndices("aIndices")};
            }
          ${w.registerUniforms(T).declareVariables(...x,N)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${N.offsetToIndices("global_idx")};
              let batch = ${K("coords",0,C.rank)};
              let d2 = ${s?K("coords",C.rank-1,C.rank):K("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${s?K("coords",1,C.rank):K("coords",2,C.rank)},
              ${s?K("coords",2,C.rank):K("coords",3,C.rank)},
              ${s?K("coords",3,C.rank):K("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?K("uniforms.x_shape",1,C.rank):K("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${s?K("uniforms.x_shape",2,C.rank):K("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${s?K("uniforms.x_shape",3,C.rank):K("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${s?K("uniforms.x_shape",4,C.rank):K("uniforms.x_shape",1,C.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = ${E}(0);
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<${E}>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<${E}>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<${E}>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<${E}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<${E}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<${E}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<${E}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<${E}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<${E}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${Q}
              result[global_idx] = ${E}(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${g};${S}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:m[0],y:m[1],z:m[2]},programUniforms:y}),getShaderSource:$}}}),yh,_h,j0=M(()=>{"use strict";ee(),re(),ie(),Pt(),yh=(e,t,r,i)=>{let n=e.length>2,a=n?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",p=l?r[3]:r[1],c=p/t.group,m=l&&c>=4?ve(p):1,g=B.size(r)/m,_=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];Nt(t,_),_.push(...Z(s,[u[0],u[1],u[2],u[3]/m]));let y=n?["rank","rank","rank"]:["rank","rank"];_.push(...Z([r[0],r[1],r[2],r[3]/m]));let v=S=>{let $=j("output",e[0].dataType,r.length,m),w=Ce($.type.tensor),T=Dt(t,$.type.value,w),I=D("x",e[0].dataType,s.length),E=D("w",e[1].dataType,u.length,m),C=[I,E];n&&C.push(D("b",e[2].dataType,e[2].dims,m));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Mt(t,z);let x=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${I.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${E.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${I.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(z).declareVariables(...C,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${m} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${x}
    ${a}
    ${T}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${m}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:v}},_h=(e,t,r,i)=>{let n=e.length>2,a=ve(r[3]),s=ve(r[2]),u=B.size(r)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[r[0],r[1],r[2],r[3]/a],m=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Nt(t,m),m.push(...Z(l,p,c));let g=(s-1)*t.strides[1]+p[1],_=y=>{let v=j("output",e[0].dataType,c.length,a),S=Ce(v.type.tensor),$=Dt(t,v.type.value,S),w=D("x",e[0].dataType,l.length,a),T=D("w",e[1].dataType,p.length,a),I=[w,T];n&&I.push(D("b",e[2].dataType,e[2].dims,a));let E=n?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Mt(t,C),`
  ${y.registerUniforms(C).declareVariables(...I,v)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${g}>;
    var values: array<${v.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${E}
      ${$}
      ${v.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${g};${p[0]};${p[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:_}}}),Xu,Nr,Yu,Mr,Ln,Yi,Ju,el,qn,K0=M(()=>{"use strict";re(),H0(),F0(),ma(),j0(),Pt(),fa(),$t(),Xu=(e,t,r,i,n,a)=>{let s=e[0],u=e.slice(a?1:2,a?3:4),l=u.length,p=t[0],c=t.slice(2).map((g,_)=>g+(g-1)*(r[_]-1)),m=u.map((g,_)=>g+i[_]+i[_+l]).map((g,_)=>Math.floor((g-c[_]+n[_])/n[_]));return m.splice(0,0,s),m.splice(a?3:1,0,p),m},Nr=[2,3,1,0],Yu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Mr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let i=e.pads.slice();Zr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},Ln=e=>{let t=pa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,a=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Yi=(e,t,r,i)=>{let n=r.format==="NHWC",a=Xu(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let C=[t[0]];if(n){let z=e.kernelCustomData.wT??e.compute(Ue(t[1],Nr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),C.push(z)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(_h(C,r,a,i),{inputs:C}):e.compute(yh(C,r,a,i),{inputs:C});return}let s=t.length===3,u=t[0].dims[n?1:2],l=t[0].dims[n?2:3],p=t[0].dims[n?3:1],c=t[1].dims[2],m=t[1].dims[3],g=a[n?1:2],_=a[n?2:3],y=a[n?3:1],v=n&&c===u&&m===l&&r.pads[0]===0&&r.pads[1]===0;if(v||c===1&&m===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=a[0],z,x,N,L=[];if(n){let J=e.kernelCustomData.wT??e.compute(Ue(t[1],Nr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=J),v){let O=u*l*p;z=t[0].reshape([1,C,O]),x=J.reshape([1,O,y]),N=[1,C,y]}else z=t[0].reshape([C,u*l,p]),x=J.reshape([1,p,y]),N=[C,g*_,y];L.push(z),L.push(x)}else z=t[0].reshape([C,p,u*l]),x=t[1].reshape([1,y,p]),N=[C,y,g*_],L.push(x),L.push(z);s&&L.push(t[2]);let X=N[2],Q=L[0].dims[L[0].dims.length-1];X<8&&Q<8?e.compute(ha(L,r,a,N,n,i),{inputs:L}):e.compute(Xr(L,r,a,N,n,i),{inputs:L});return}let S=!0,$=e.kernelCustomData.wT??e.compute(Ue(t[1],Nr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let w=[t[0],$];s&&w.push(t[2]);let T=n?g*_:y,I=n?y:g*_,E=c*m*p;e.compute(fh(w,r,a,T,I,E,s,S,i),{inputs:w})},Ju=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=Mr({...t,pads:n,strides:a,dilations:s,kernelShape:u},i);Yi(e,i,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},el=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=Mr(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=mh(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,i);e.compute(gh(t,n,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},qn=(e,t)=>{if(Yu(e.inputs,t),e.inputs[0].dims.length===3)Ju(e,t);else if(e.inputs[0].dims.length===5)el(e,e.inputs,t);else{let r=Mr(t,e.inputs);Yi(e,e.inputs,r)}}}),wh,Z0=M(()=>{"use strict";ee(),dt(),re(),ie(),wh=(e,t,r)=>{let i=e.length>2,n=t.outputShape,a=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,p=u[3],c=a?ve(l):1,m=a&&p===1&&l>=4,g=m?Math.floor(l/4)*4:Math.floor(l/c)*c,_=l-g,y=a?ve(p):1,v=a?p===1?c:y:1,S=B.size(n)/y,$=[Math.ceil(S/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let w=["rank","rank"],T=[t.strides[0],t.strides[1]],I=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],E=[t.dilations[0],t.dilations[1]],C=[I[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),I[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],z=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],x=[{type:12,data:S},{type:12,data:T},{type:12,data:I},{type:12,data:E},{type:12,data:C},{type:6,data:z},{type:12,data:g},{type:12,data:l},{type:12,data:p},...Z(e[0].dims,e[1].dims)];i&&(x.push(...Z(e[2].dims)),w.push("rank")),x.push(...Z(n));let N=L=>{let X=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:I.length},{name:"dilations",type:"u32",length:I.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Q=Ce(e[0].dataType),J=a?1:2,O=a?2:3,W=a?3:1,Y=D("W",e[1].dataType,e[1].dims.length,v),P=D("Dy",e[0].dataType,e[0].dims.length,c),se=[P,Y];i&&se.push(D("bias",e[2].dataType,[n[W]].length,y));let ne=j("result",e[0].dataType,n.length,y),te=()=>{let F="";if(m)c===4?F+=`
        let xValue = ${P.getByOffset("x_offset")};
        let wValue = ${Y.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?F+=`
          dotProd = dotProd + dot(vec4<${Q}>(${P.getByOffset("x_offset")}, ${P.getByOffset("x_offset + 1u")}), vec4<${Q}>(${Y.getByOffset("w_offset")}, ${Y.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(F+=`
          dotProd = dotProd + dot(vec4<${Q}>(${P.getByOffset("x_offset")}, ${P.getByOffset("x_offset + 1u")}, ${P.getByOffset("x_offset + 2u")}, ${P.getByOffset("x_offset + 3u")}), vec4<${Q}>(${Y.getByOffset("w_offset")}, ${Y.getByOffset("w_offset + 1u")}, ${Y.getByOffset("w_offset + 2u")}, ${Y.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(F+=`
                  let xValue = ${a?P.getByOffset(`${P.indicesToOffset(`${P.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):P.get("batch","inputChannel","idyR","idyC")};
        `,c===1)F+=`
          let w_offset = ${Y.indicesToOffset(`${Y.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Y.getByOffset(`w_offset / ${v}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let V=0;V<c;V++)F+=`
            let wValue${V} = ${Y.getByOffset(`${Y.indicesToOffset(`${Y.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${V}, wOutChannel)`)} / ${v}`)};
            dotProd = dotProd + xValue[${V}] * wValue${V};`;return F},U=()=>{if(_===0)return"";if(!m)throw new Error(`packInputAs4 ${m} is not true.`);let F="";if(c===1){F+="dotProd = dotProd";for(let V=0;V<_;V++)F+=`
            + ${P.getByOffset(`x_offset + ${V}`)} * ${Y.getByOffset(`w_offset + ${V}`)}`;F+=";"}else if(c===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);F+=`
          let xValue = ${P.getByOffset("x_offset")};
          let wValue = ${Y.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return F},H=`
            let outputIndices = ${ne.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${ne.indicesGet("outputIndices",0)};
            let d1 = ${ne.indicesGet("outputIndices",W)};
            let r = ${ne.indicesGet("outputIndices",J)};
            let c = ${ne.indicesGet("outputIndices",O)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${ne.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${Q}(dyRCorner) + ${Q}(wR)) / ${Q}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${Q}(uniforms.Dy_shape[${J}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${Q}(dyCCorner) + ${Q}(wC)) / ${Q}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${Q}(uniforms.Dy_shape[${O}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${m?`
                var x_offset = ${P.indicesToOffset(`${P.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${Y.indicesToOffset(`${Y.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${v};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${m?4:c}) {
                  ${te()}
                  inputChannel = inputChannel + ${m?4:c};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${y}]`:""};
            ${ne.setByOffset("global_idx","value")};
          `;return`
    ${L.registerUniforms(X).declareVariables(...se,ne)}
      ${L.mainStart()}
      ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${H}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${v}${y}${m}${_}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:N}}}),tl,rl,il,Ji,$h,nl,en,al,bh,Q0=M(()=>{"use strict";Z0(),Pt(),$t(),tl=(e,t,r,i,n,a)=>(e-1)*t+r+(i-1)*n+1-a,rl=(e,t,r,i,n)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=a,r[n]=e-a):t==="SAME_LOWER"&&(r[i]=e-a,r[n]=a)},il=(e,t,r,i,n,a,s,u,l,p)=>{let c=e.length-2,m=p.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let g=e[0],_=t[u?3:1]*n;for(let y=0,v=e.length-c-(u?1:0);y<c;++y,++v){let S=e[v],$=m?S*s[y]:p[y],w=tl(S,s[y],a[y],t[v],r[y],$);rl(w,i,a,y,y+c),m&&p.push(s[y]*(S-1)+l[y]+(t[v]-1)*r[y]+1-a[y]-a[y+c])}p.splice(0,0,g),p.splice(u?3:1,0,_)},Ji=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((m,g)=>m*g,1)===0){r.length=0;for(let m=2;m<t[1].dims.length;++m)r.push(t[1].dims[m])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((m,g)=>m+g,0)===0){let m=t[0].dims.length-2;l=new Array(m).fill(1)}let p=e.strides.slice();if(p.reduce((m,g)=>m+g,0)===0){let m=t[0].dims.length-2;p=new Array(m).fill(1)}il(u,r,l,e.autoPad,e.group,n,p,i,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:n,outputPadding:s,outputShape:a,dilations:l,strides:p}),c},$h=e=>{let t=pa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,a=e.group??1,s=e.kernelShape,u=e.pads,l=e.strides,p=e.wIsConst(),c=e.outputPadding,m=e.outputShape;return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,outputPadding:c,outputShape:m,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},nl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},en=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(Ue(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let a=[t[0],n];t.length===3&&a.push(t[2]),e.compute(wh(a,r,i),{inputs:a})},al=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),a=[1].concat(a),n=[1].concat(n);let l=t.outputPadding;l=[0].concat(l);let p=Ji({...t,pads:u,strides:s,dilations:a,kernelShape:n,outputPadding:l},i);en(e,i,p,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},bh=(e,t)=>{if(nl(e.inputs,t),e.inputs[0].dims.length===3)al(e,t);else{let r=Ji(t,e.inputs);en(e,e.inputs,r)}}}),sl,vh,xh,X0=M(()=>{"use strict";ee(),re(),xe(),ie(),sl=(e,t,r,i)=>{let n=B.size(t),a=t.length,s=D("input",e,a),u=j("output",e,a),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=B.normalizeAxis(l,a),c=m=>{let g=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=K("uniforms.input_shape","uniforms.axis",a),y=i.reverse?g+(i.exclusive?" + 1":""):"0",v=i.reverse?_:g+(i.exclusive?"":" + 1");return`
                ${m.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${m.mainStart()}
                  ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${v};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:p},...Z(t,t)]}),getShaderSource:c}},vh=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(sl(i,r,n,t),{inputs:[0]})},xh=e=>{let t=e.exclusive===1,r=e.reverse===1;return fe({exclusive:t,reverse:r})}}),ol,ul,ll,Sh,kh,Y0=M(()=>{"use strict";ee(),re(),xe(),ie(),ol=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},ul=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)n.push(r.indicesSet("a",e[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)},ll=(e,t)=>{let r,i,n,a,s,u,l=t.format==="NHWC",p=t.blocksize,c=t.mode==="DCR";l?([r,i,n,a]=e.dims,s=c?[r,i,n,p,p,a/p**2]:[r,i,n,a/p**2,p,p],u=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[r,p,p,a/p**2,i,n]:[r,a/p**2,p,p,i,n],u=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let m=e.reshape(s),g=m.dims.length,_=e.dataType,y=D("a",_,g),v=j("output",_,g),S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(y,v)}

  ${ul(u,g,y,v)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let w=l?[r,i*p,n*p,a/p**2]:[r,a/p**2,i*p,n*p],T=B.size(w),I=m.dims,E=B.sortBasedOnPerm(I,u);return{outputs:[{dims:w,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...Z(I,E)]}},getShaderSource:S}},Sh=(e,t)=>{ol(e.inputs),e.compute(ll(e.inputs[0],t))},kh=e=>fe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),ot,nr,Ur,tn,gt,dl,pl,cl,rn,nn,an,hl,fl,sn,ml,Th,Ih,J0=M(()=>{"use strict";ee(),re(),xe(),ie(),ot=256,nr=512,Ur=2*Math.PI,tn=e=>{let t=[],r=e;for(let i of[4,2,3,5])for(;r%i===0;)t.push(i),r/=i;return r===1?t:void 0},gt=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},dl=(e,t,r,i,n)=>{let a=r/e,s=nr-i,u=p=>`smem[${s}u + base + ${p*t}u]`,l=`  for (var t = local_idx; t < ${a}u; t += ${ot}u) {
`;l+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,l+=`    var leg: array<vec2<f32>, 5>;
`;for(let p=0;p<e;p++){let c=`${i}u + t + ${p*a}u`;if(p===0)l+=`    leg[0] = smem[${c}];
`;else{let m=n*Ur*p/(e*t);l+=`    { let a = ${gt(m)} * angleUnit; leg[${p}] = cmul(smem[${c}], vec2<f32>(cos(a), sin(a))); }
`}}if(l+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)l+=`    ${u(0)} = leg[0] + leg[1];
    ${u(1)} = leg[0] - leg[1];
`;else if(e===4){let p=n<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";l+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,l+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,l+=`    let oddRot = ${p};
`,l+=`    ${u(0)} = evenSum + oddSum;
    ${u(1)} = evenDiff + oddRot;
`,l+=`    ${u(2)} = evenSum - oddSum;
    ${u(3)} = evenDiff - oddRot;
`}else for(let p=0;p<e;p++){let c=["leg[0]"];for(let m=1;m<e;m++){let g=n*Ur*(m*p)/e,_=gt(Math.cos(g)),y=gt(Math.sin(g));c.push(`vec2<f32>(leg[${m}].x*${_} - leg[${m}].y*${y}, leg[${m}].x*${y} + leg[${m}].y*${_})`)}l+=`    ${u(p)} = ${c.join(" + ")};
`}return`${l}  }
  workgroupBarrier();
`},pl=(e,t,r)=>{let i="",n=1,a=0;for(let s of e)i+=dl(s,n,t,a,r),n*=s,a=nr-a;return{code:i,resultOffset:a}},cl=(e,t,r,i,n)=>{let a=e.dims,s=a.length,u=a[s-1],l=a[t],p=r&&i?(l-1)*2:l;n!==void 0&&(p=n);let c=r&&i?1:2,m=i&&!r?Math.floor(p/2)+1:p,g=a.slice();g[t]=m,g[s-1]=c;let _=1;for(let v=t+1;v<s-1;v++)_*=a[v];let y=B.size(a)/u/l;return{dataType:e.dataType,outputDims:g,length:p,signalLength:l,inner:_,batch:y,inputComponents:u,outputComponents:c,outputLength:m,inverse:r,onesided:i}},rn=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),nn=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],an=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),hl=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:a,onesided:s}=e,u=Ee(t),l=a?1:-1,p=a?1/r:1,c=tn(r),m=g=>{let _=D("x",t,[1]),y=j("y",t,[1]),v=E=>{let C=`inBase + (${E}) * uniforms.inner * ${i}u`,z=`f32(${_.getByOffset(C)})`,x=i===2?`f32(${_.getByOffset(`${C} + 1u`)})`:"0.0";return`vec2<f32>(${z}, ${x})`},S;if(a&&s){let E=Math.floor(r/2)+1,C=r%2===0?`select(provided, provided - 1u, provided == ${E}u)`:"provided";S=`
    let provided = min(uniforms.signalLength, ${E}u);
    for (var i = local_idx; i < ${r}u; i += ${ot}u) {
      if (i < provided) { smem[i] = ${v("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${C}; k += ${ot}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else S=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${ot}u) {
      if (i < loadCount) { smem[i] = ${v("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:$,resultOffset:w}=pl(c,r,l),T=p===1?`smem[${w}u + i]`:`smem[${w}u + i] * ${gt(p)}`,I=n===2?y.setByOffset("off + 1u",`${u}(v.y)`):"";return`
  ${an(g,_,y)}
  var<workgroup> smem: array<vec2<f32>, ${2*nr}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${g.mainStart(ot)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    ${S}
${$}    for (var i = local_idx; i < uniforms.outputLength; i += ${ot}u) {
      let v = ${T};
      let off = outBase + i * uniforms.inner * ${n}u;
      ${y.setByOffset("off",`${u}(v.x)`)}
      ${I}
    }
  }`};return{name:"DFT",shaderCache:{hint:rn(e,"fft"),inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:nn(e),dispatchGroup:{x:e.batch}})}},fl=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:a,onesided:s}=e,u=Ee(t),l=a?1:-1,p=a?1/r:1,c=m=>{let g=D("x",t,[1]),_=j("y",t,[1]),y=T=>{let I=`inBase + (${T}) * uniforms.inner * ${i}u`,E=`f32(${g.getByOffset(I)})`,C=i===2?`f32(${g.getByOffset(`${I} + 1u`)})`:"0.0";return`vec2<f32>(${E}, ${C})`},v=a&&s?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${y("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${y("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${y("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,S=`
      let angle = ${gt(l*Ur)} * f32(knMod) / ${gt(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,$=n===2?_.setByOffset("off + 1u",`${u}(v.y)`):"",w=p===1?"acc":`acc * ${gt(p)}`;return`
  ${an(m,g,_)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${v}
  ${m.mainStart(ot)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${ot}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${S}
      }
      let v = ${w};
      let off = outBase + k * uniforms.inner * ${n}u;
      ${_.setByOffset("off",`${u}(v.x)`)}
      ${$}
    }
  }`};return{name:"DFT",shaderCache:{hint:rn(e,"direct"),inputDependencies:["type"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:nn(e),dispatchGroup:{x:e.batch}})}},sn=e=>{if(!e||e.dataType===0)return;if(B.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},ml=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},Th=(e,t)=>{ml(e.inputs);let r=e.inputs[0],i=r.dims.length,n=t.inverse!==0,a=t.onesided!==0,s=sn(e.inputs[1]);if(s!==void 0&&s<=0)throw new Error("dft_length must be greater than zero.");let u=B.normalizeAxis(sn(e.inputs[2])??t.axis,i);if(u===i-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(n&&a&&r.dims[i-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let l=cl(r,u,n,a,s);if(l.length<=0)throw new Error(`Invalid DFT length: ${l.length}`);let p=l.length<=nr&&tn(l.length)!==void 0?hl(l):fl(l);e.compute(p,{inputs:[0]})},Ih=e=>fe({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Pr,ar,on,gl,yl,_l,wl,un,$l,Eh,Ch,ey=M(()=>{"use strict";ee(),re(),xe(),ie(),Pr="[a-zA-Z]|\\.\\.\\.",ar="("+Pr+")+",on="^"+ar+"$",gl="("+ar+",)*"+ar,yl="^"+gl+"$",_l=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},wl=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(yl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,a)=>{let s=e[a].dims.slice();if(!n.match(RegExp(on)))throw new Error("Invalid LHS term");let u=this.processTerm(n,!0,s,a);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,a])=>a.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(ar)))throw new Error("Invalid RHS");i.match(RegExp(Pr,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(n);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,a=!1,s=[],u=0;if(!e.match(RegExp(on))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Pr,"g")),p=new _l(i);return l?.forEach((c,m)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let g=n-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let _=0;_<s.length;_++){let y=String.fromCharCode(48+_);p.addSymbol(y,m+_),this.addSymbol(y,r[u++],i)}}else p.addSymbol(c,m+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[u++],i)}),p}},un=e=>e+"_max",$l=(e,t,r,i)=>{let n=e.map(p=>p.length).map((p,c)=>D(`input${c}`,t,p)),a=B.size(i),s=j("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),l=p=>{let c=[],m="var prod = 1.0;",g="var sum = 0.0;",_="sum += prod;",y=[],v=[],S=[],$=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((I,E)=>{if(r.rhs.symbolToIndices.has(E)){let C=r.rhs.symbolToIndices.get(E)?.[0];C!==void 0&&r.lhs.forEach((z,x)=>{if(I.inputIndices.includes(x)){let N=z.symbolToIndices.get(E);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(L=>{c.push(`${n[x].indicesSet(`input${x}Indices`,L,s.indicesGet("outputIndices",C))}`)})}})}else r.lhs.forEach((C,z)=>{if(I.inputIndices.includes(z)){let x=C.symbolToIndices.get(E);if(x===void 0)throw new Error("Invalid symbol error");x.forEach(N=>{y.push(`${n[z].indicesSet(`input${z}Indices`,N,`${E}`)}`)}),$.push(`prod *= ${n[z].getByIndices(`input${z}Indices`)};`)}}),v.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${un(E)}; ${E}++) {`),S.push("}")});let T=w?[...c,`let sum = ${n.map((I,E)=>I.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...c,g,...v,...y,m,...$,_,...S];return`
            ${p.registerUniforms(u.map(I=>({name:`${un(I)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${n.map((I,E)=>`var input${E}Indices: ${n[E].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=u.filter(m=>r.symbolToInfo.has(m)).map(m=>({type:12,data:r.symbolToInfo.get(m)?.dimValue||0}));p.push({type:12,data:a});let c=e.map((m,g)=>[...Z(m)]).reduce((m,g)=>m.concat(g),p);return c.push(...Z(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:l}},Eh=(e,t)=>{let r=new wl(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((a,s)=>a.dims);e.compute($l(n,e.inputs[0].dataType,r,i))},Ch=e=>{let t=e.equation.replace(/\s+/g,"");return fe({equation:t})}}),bl,ln,vl,xl,zh,ty=M(()=>{"use strict";ee(),re(),ie(),bl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ln=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},vl=(e,t)=>e.length>t.length?ln(e,t):ln(t,e),xl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=vl(t,r),n=e[0].dataType,a=n===9||B.size(t)===1,s=n===9||t.length>0&&t[t.length-1]%4===0?4:1,u=a||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(B.size(i)/u),p=m=>{let g=D("input",n,t.length,s),_=j("output",n,i.length,u),y;if(n===9){let v=(S,$,w="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${g.broadcastedIndicesToOffset(`outputIndices${$}`,_)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${S}[${$}] = ${w}(${g.getByOffset(`index${$}`)}[component${$}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${v("data",0,"u32")}
        ${v("data",1,"u32")}
        ${v("data",2,"u32")}
        ${v("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${m.registerUniform("vec_size","u32").declareVariables(g,_)}
    ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},c=[{type:12,data:l},...Z(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},zh=e=>{bl(e.inputs),e.compute(xl(e.inputs),{inputs:[0]})}}),Sl,Ah,ry=M(()=>{"use strict";ee(),re(),ie(),da(),Sl=e=>{let t=e[0].dataType,r=B.size(e[0].dims),i=B.size(e[1].dims),n=i%4===0,a=s=>{let u=D("x",t,[1],4),l=D("bias",t,[1],4),p=j("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],m=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,g=n?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${m(0)}${m(1)}${m(2)}${m(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(u,l,p)}

    ${Nn(Ee(t))}

    ${s.mainStart(jt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",Mn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/jt/4)}})}},Ah=e=>{e.inputs.length<2||B.size(e.inputs[1].dims)===0?Zc(e):e.compute(Sl(e.inputs))}}),kl,Tl,Oh,Bh,iy=M(()=>{"use strict";ee(),re(),xe(),ie(),kl=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Tl=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=B.normalizeAxis(t.axis,n),s=r.slice(0);s.splice(a,1,...i);let u=r[a],l=e[0].dataType===9?4:1,p=Math.ceil(B.size(s)/l),c=[{type:12,data:p},{type:6,data:u},{type:12,data:a},...Z(e[0].dims,e[1].dims,s)],m=g=>{let _=D("data",e[0].dataType,e[0].dims.length,l),y=D("inputIndices",e[1].dataType,e[1].dims.length),v=j("output",e[0].dataType,s.length,l),S=w=>{let T=i.length,I=`var indicesIndices${w}  = ${y.type.indices}(0);`;for(let E=0;E<T;E++)I+=`${T>1?`indicesIndices${w}[${E}]`:`indicesIndices${w}`} = ${s.length>1?`outputIndices${w}[uniforms.axis + ${E}]`:`outputIndices${w}`};`;I+=`
          var idx${w} = ${y.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${_.type.indices};
        `;for(let E=0,C=0;E<n;E++)E===a?(I+=`${n>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = u32(idx${w});`,C+=T):(I+=`${n>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = ${s.length>1?`outputIndices${w}[${C}]`:`outputIndices${w}`};`,C++);return I},$;if(e[0].dataType===9){let w=(T,I,E="")=>`
          let outputIndices${I} = ${v.offsetToIndices(`outputOffset + ${I}u`)};
          ${S(I)};
          let offset${I} = ${_.indicesToOffset(`dataIndices${I}`)};
          let index${I} = offset${I} / 4u;
          let component${I} = offset${I} % 4u;
          ${T}[${I}] = ${E}(${_.getByOffset(`index${I}`)}[component${I}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${v.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${v.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${_.getByIndices("dataIndices")};
      ${v.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,y,v)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:m}},Oh=e=>fe({axis:e.axis}),Bh=(e,t)=>{let r=e.inputs;kl(r),e.compute(Tl(e.inputs,t))}}),Il,Rh,Dh,ny=M(()=>{"use strict";ee(),re(),ie(),Il=(e,t,r,i,n,a,s,u,l)=>{let p=[{type:12,data:a},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:l}],c=[a];p.push(...Z(t.dims,c));let m=g=>{let _=D("indices_data",t.dataType,t.dims.length),y=j("input_slice_offsets_data",12,1,1),v=[_,y],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(S).declareVariables(...v)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:m},{inputs:[t],outputs:[-1]})[0]},Rh=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,a=r[1].dims,s=a[a.length-1],u=B.sizeToDimension(a,a.length-1),l=B.sizeFromDimension(i,t.batchDims+s),p=B.sizeToDimension(i,t.batchDims),c=B.sizeFromDimension(i,t.batchDims),m=u/p,g=new Array(s),_=l;for(let I=0;I<s;++I)g[s-1-I]=_,_*=i[t.batchDims+s-1-I];let y=Il(e,r[1],g,t.batchDims,i,u,m,c,s),v=t.batchDims+s;if(v>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=a.slice(0,-1).concat(i.slice(v)),$=B.size(S),w=[{type:12,data:$},{type:12,data:l},...Z(r[0].dims,y.dims,S)],T=I=>{let E=D("data",r[0].dataType,r[0].dims.length),C=D("slice_offsets",12,y.dims.length),z=j("output",r[0].dataType,S.length);return`
          ${I.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,C,z)}
            ${I.mainStart()}
            ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:n}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:w}),getShaderSource:T},{inputs:[r[0],y]})},Dh=e=>({batchDims:e.batch_dims,cacheKey:""})}),El,Cl,Nh,Mh,ay=M(()=>{"use strict";ee(),re(),xe(),ie(),El=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=B.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==n.dims.length||!n.dims.map((u,l)=>l===r?Math.ceil(u/i)===a.dims[l]:u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((u,l)=>u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Cl=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=B.normalizeAxis(t.gatherAxis,n),s=B.normalizeAxis(t.quantizeAxis,n),u=r.slice(0);u.splice(a,1,...i);let l=B.size(u),p=e[2].dataType,c=e[0].dataType===22,m=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...Z(...e.map((_,y)=>_.dims),u)],g=_=>{let y=D("data",e[0].dataType,e[0].dims.length),v=D("inputIndices",e[1].dataType,e[1].dims.length),S=D("scales",e[2].dataType,e[2].dims.length),$=e.length>3?D("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=j("output",p,u.length),T=[y,v,S];$&&T.push($);let I=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${_.registerUniforms(I).declareVariables(...T,w)}
        ${_.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${v.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${v.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${v.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${y.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${y.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${y.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${$?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ee(p)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((_,y)=>y!==1).map(_=>_.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(_,y)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:m}),getShaderSource:g}},Nh=(e,t)=>{let r=e.inputs;El(r,t),e.compute(Cl(e.inputs,t))},Mh=e=>fe({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),zl,Al,Uh,Ph,sy=M(()=>{"use strict";ee(),re(),xe(),ie(),zl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Al=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,a=e[1].dims,s=e[1].dataType,u=B.normalizeAxis(t.axis,n),l=r[u],p=a.slice(0),c=B.size(p),m=D("input",i,n),g=D("indicesInput",s,a.length),_=j("output",i,p.length),y=[{type:12,data:c},{type:6,data:l},{type:12,data:u}];return y.push(...Z(r,a,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:y}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,g,_)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${m.type.indices}(outputIndices);
      ${m.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${m.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},Uh=e=>fe({axis:e.axis}),Ph=(e,t)=>{let r=e.inputs;zl(r),e.compute(Al(e.inputs,t))}}),Ol,Bl,Lh,qh,oy=M(()=>{"use strict";ee(),re(),ie(),Ol=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Bl=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,a,s]=Dp.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[n,a];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(a/l),c=Math.ceil(n/l),m=!0,g=B.size(u),_=[{type:12,data:m?p:g},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(_.push(...Z(e[2].dims)),y.push("rank")),_.push(...Z(u));let v=$=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",I=D("a",e[0].dataType,e[0].dims),E=D("b",e[1].dataType,e[1].dims),C=I.type.value,z=null,x=[I,E];e.length===3&&(z=D("c",e[2].dataType,e[2].dims.length),x.push(z));let N=j("output",e[0].dataType,u.length);x.push(N);let L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(L).declareVariables(...x)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${T}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",N)}; value += ${C}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=$=>{let w=D("a",e[0].dataType,e[0].dims),T=D("b",e[1].dataType,e[1].dims),I=null,E=[w,T];e.length===3&&(I=D("c",e[2].dataType,e[2].dims.length),E.push(I));let C=j("output",e[0].dataType,u.length);E.push(C);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],x="",N="";t.transA&&t.transB?(N=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(N=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(N=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(N=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let L=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(z).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${N}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${x}
      }
      workgroupBarrier();
    }

    ${L}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${I!=null?`let cOffset = ${I.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${I.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return m?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:p*c},programUniforms:_}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:v}},Lh=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},qh=(e,t)=>{Ol(e.inputs),e.compute(Bl(e.inputs,t))}}),rt,ut,kt,Tt,Rl,Dl,Nl,Ml,Ul,Pl,Ll,ql,Wh,Vh,uy=M(()=>{"use strict";ee(),re(),xe(),ie(),[rt,ut,kt,Tt]=[0,1,2,3],Rl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Dl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Nl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Ml=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Ul=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Pl=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${rt}] = batch;
     indices[${ut}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${kt}] = u32(r);
            indices[${Tt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${kt}] = u32(clamp(r, 0, H - 1));
          indices[${Tt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${kt}] = gs_reflect(r, border[1], border[3]);
          indices[${Tt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Ll=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${rt}], indices[${ut}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${rt}], indices[${ut}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${rt}], indices[${ut}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${rt}], indices[${ut}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${rt}], indices[${ut}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${rt}], indices[${ut}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,ql=(e,t)=>{let r=D("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=D("grid",e[1].dataType,i.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[rt,ut,kt,Tt]=[0,3,1,2]);let s=j("output",e[0].dataType,a.length),u=r.type.value,l=B.size(a),p=[{type:12,data:l},...Z(e[0].dims,i,a)],c=m=>`
  ${m.registerUniform("output_size","u32").declareVariables(r,n,s)}
  ${Dl}
  ${Nl(u)}
  ${Ml(t)}
  ${Ul(t)}
  ${Pl(r,u,t)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${kt}]);
      let W_in = i32(uniforms.x_shape[${Tt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${rt}], indices[${kt}], indices[${Tt}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Ll(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:m=>{let g=B.size(a);return{outputs:[{dims:a,dataType:m[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:p}},getShaderSource:c}},Wh=(e,t)=>{Rl(e.inputs),e.compute(ql(e.inputs,t))},Vh=e=>fe({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Re,Wl,Gh,dn,Vl,hr,Hh,Fh=M(()=>{"use strict";ee(),re(),xe(),sa(),la(),ie(),$t(),Re=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Wl=(e,t)=>{let r=e[0],i=Re(e,1),n=Re(e,2),a=Re(e,3),s=Re(e,4),u=Re(e,5),l=Re(e,6),p=Re(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],m=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=m,y=0,v=0,S=Math.floor(g/t.numHeads);if(l&&p&&B.size(l.dims)&&B.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==t.numHeads||p.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=l.dims[2],v=l.dims[2]}else if(l&&B.size(l.dims)||p&&B.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(i&&B.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,_=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,_=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,_=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(a&&B.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=y+_,T=0;if(s&&B.size(s.dims)>0){T=8;let z=s.dims;throw z.length===1?z[0]===c?T=1:z[0]===3*c+2&&(T=3):z.length===2&&z[0]===c&&z[1]===w&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let I=!1,E=g;if(n&&B.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(_!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=n.dims[2]}else{if(_!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=n.dims[1]*n.dims[3],I=!0}}let C=!1;if(s&&B.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&B.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[2]!==m||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:m,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:w,maxSequenceLength:v,inputHiddenSize:0,hiddenSize:g,vHiddenSize:E,headSize:S,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:C,passPastInKv:I,qkvFormat:$}},Gh=e=>fe({...e}),dn=fe({perm:[0,2,1,3]}),Vl=(e,t,r,i,n,a,s)=>{let u=[i,n,a],l=B.size(u),p=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],c=m=>{let g=j("qkv_with_bias",t.dataType,u),_=D("qkv",t.dataType,u),y=D("bias",r.dataType,u),v=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${m.registerUniforms(v).declareVariables(_,y,g)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},hr=(e,t,r,i,n,a,s,u)=>{let l=a;if(s&&B.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Vl(e,a,s,t,i,r*n,u),l=l.reshape([t,i,r,n]),r===1||i===1?l:e.compute(Ue(l,dn.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,i,r,n])),r===1||i===1?l:e.compute(Ue(l,dn.perm),{inputs:[l],outputs:[-1]})[0]},Hh=(e,t)=>{let r=Wl(e.inputs,t),i=e.inputs[0],n=Re(e.inputs,1),a=Re(e.inputs,2),s=Re(e.inputs,3),u=Re(e.inputs,4),l=Re(e.inputs,5),p=Re(e.inputs,6),c=Re(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let m=n&&a&&n.dims.length===4&&a.dims.length===4,g=hr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(m)return gr(e,g,n,a,u,void 0,p,c,l,r);if(!n||!a)throw new Error("key and value must be provided");let _=hr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,s,r.hiddenSize),y=hr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);gr(e,g,_,y,u,void 0,p,c,l,r)}}),Gl,Hl,Fl,jl,Wn,jh,Kh,Zh=M(()=>{"use strict";ee(),re(),xe(),ie(),Gl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Hl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),fe({numOutputs:i,axis:t.axis,splitSizes:r})},Fl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,jl=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Wn=(e,t)=>{let r=e[0].dims,i=B.size(r),n=e[0].dataType,a=B.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=D("input",n,r.length),l=new Array(t.numOutputs),p=[],c=[],m=0,g=[{type:12,data:i}];for(let y=0;y<t.numOutputs;y++){m+=t.splitSizes[y],l[y]=m;let v=r.slice();v[a]=t.splitSizes[y],c.push(v),s[y]=j(`output${y}`,n,v.length),p.push({dims:c[y],dataType:e[0].dataType})}g.push({type:12,data:l},...Z(r,...c));let _=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${Fl(l.length)}
  ${jl(s)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},jh=(e,t)=>{Gl(e.inputs);let r=e.inputs.length===1?t:Hl(e.inputs,t);e.compute(Wn(e.inputs,r),{inputs:[0]})},Kh=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return fe({axis:t,numOutputs:i,splitSizes:r})}}),Kl,Yr,Qh,Xh=M(()=>{"use strict";ee(),re(),xe(),ie(),Kl=(e,t)=>{let[r,i,n,a]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!B.areEqual(i.dims,[])&&!B.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!B.areEqual(n.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],p=r.dims[r.dims.length-2],c=n.dims[0],m=B.sizeFromDimension(r.dims,1)/p,g=u===0?n.dims[1]*2:m/s;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(p!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(p>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(g/2!==n.dims[1]&&u/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`)},Yr=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:a}=t,s=e[0].dims[0],u=B.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=u/l,c=e[2].dims[1],m=n===0?c*2:p/i,g=new Array(s,l,p/m,m-c),_=B.computeStrides(g),y=[{type:1,data:a},{type:12,data:g},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[u,p,m,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,m,l*m,1]}):[],...Z(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],v=S=>{let $=D("input",e[0].dataType,e[0].dims.length),w=D("position_ids",e[1].dataType,e[1].dims.length),T=D("cos_cache",e[2].dataType,e[2].dims.length),I=D("sin_cache",e[3].dataType,e[3].dims.length),E=j("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${S.declareVariables($,w,T,I,E)}

        ${S.mainStart(jt)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",j("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:fe({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(g)/jt)},programUniforms:y})}},Qh=(e,t)=>{Kl(e.inputs,t),e.compute(Yr(e.inputs,t))}}),Zl,Ql,pn,Xl,Yh,ly=M(()=>{"use strict";xe(),ee(),la(),Fh(),Zh(),$t(),Xh(),ie(),Zl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],p=r.dims[1],c=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],m=p,g=0,_=!i||i.dims.length===0,y=Math.floor(_?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);_&&(c=y*t.numHeads);let v=a&&a.dims.length!==0,S=s&&s.dims.length!==0;if(v&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(v&&S){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=a.dims[2]}else if(v||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');m=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');m=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');m=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let w=0,T=!1,I=t.kvNumHeads?y*t.kvNumHeads:c;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(m!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=n.dims[2]}else{if(m!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');I=n.dims[1]*n.dims[3],T=!0}}let E=e.length>4?e[5]:void 0;if(E){if(E.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let C=E.dims.reduce((z,x)=>z*x,1);if(C!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${C}.`);for(let z=0;z<E.dims.length;z++)if(E.dims[z]!==1&&E.dims[z]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${z}] = ${E.dims[z]}.`)}return{batchSize:l,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:I,headSize:y,vHeadSize:Math.floor(I/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:$}},Ql=fe({perm:[0,2,1,3]}),pn=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(Ue(i,Ql.perm),{inputs:[i],outputs:[-1]})[0]),i},Xl=(e,t,r,i)=>{let n=7,a=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],p=c=>{let m=D("seq_lens",r.dataType,r.dims),g=D("total_seq_lens",i.dataType,i.dims),_=j("pos_ids",n,s),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(y).declareVariables(m,g,_)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${m.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${_.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:p}},Yh=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=Zl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,m=fe({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[g,_,y]=!n&&!a?e.compute(Wn([i],m),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,a],v,S;if(t.doRotary){let I=e.compute(Xl(r.batchSize,r.sequenceLength,l,p),{inputs:[l,p],outputs:[-1]})[0],E=e.inputs[7],C=e.inputs[8],z=fe({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),x=[g,I,E,C],N=[-1];v=e.compute(Yr(x,z),{inputs:x,outputs:N})[0],x.splice(0,1,_);let L=fe({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});S=e.compute(Yr(x,L),{inputs:x,outputs:N})[0]}let $=hr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?v:g,void 0,0),w=pn(e,t.doRotary?S:_,r),T=pn(e,y,r);gr(e,$,w,T,void 0,void 0,s,u,void 0,r,l,p)}}),cn,Yl,Jl,Jh,dy=M(()=>{"use strict";ee(),re(),$t(),ie(),cn=(e,t,r,i,n,a,s,u)=>{let l=ve(a),p=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,m=n*s,g=64;m===1&&(g=256);let _=[n,s,a/l],y=[n,s,2],v=["rank","type","type"],S=[];S.push(...Z(_,y));let $=w=>{let T=D("x",t.dataType,3,l),I=D("scale",r.dataType,r.dims),E=D("bias",i.dataType,i.dims),C=j("output",1,3,2),z=[T,I,E,C];return`
  var<workgroup> workgroup_shared : array<${c}, ${g}>;
  const workgroup_size = ${g}u;
  ${w.declareVariables(...z)}
  ${w.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${T.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${wt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${wt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${g}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:m},programUniforms:S}),getShaderSource:$},{inputs:[t,r,i],outputs:[-1]})[0]},Yl=(e,t,r)=>{let i=t[0].dims,n=i,a=2,s=i[0],u=i[1],l=B.sizeFromDimension(i,a),p=ve(l),c=B.size(n)/p,m=cn(e,t[0],t[1],t[2],s,l,u,r.epsilon),g=[s,u,l/p],_=[s,u],y=["type","none"],v=S=>{let $=D("x",t[0].dataType,g.length,p),w=D("scale_shift",1,_.length,2),T=j("output",t[0].dataType,g.length,p),I=[$,w,T];return`
  ${S.registerUniform("output_size","u32").declareVariables(...I)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...Z(g,_,g)]}),getShaderSource:v},{inputs:[t[0],m]})},Jl=(e,t,r)=>{let i=t[0].dims,n=i,a=i[0],s=i[i.length-1],u=B.sizeFromDimension(i,1)/s,l=ve(s),p=B.size(n)/l,c=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],m=["type","type"],g=!1,_=[0,i.length-1];for(let $=0;$<i.length-2;$++)g=g||i[$+1]!==1,_.push($+1);g=g&&i[i.length-1]!==1;let y=g?e.compute(Ue(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},($,w)=>i[_[w]])),v=cn(e,y,t[1],t[2],a,u,s,r.epsilon),S=$=>{let w=Ce(t[0].dataType),T=l===1?"vec2f":`mat${l}x2f`,I=z=>{let x=z===0?"x":"y",N=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${w}(${N}(scale.${x}))`;case 2:return`vec2<${w}>(${N}(scale[0].${x}, scale[1].${x}))`;case 4:return`vec4<${w}>(${N}(scale[0].${x}, scale[1].${x}, scale[2].${x}, scale[3].${x}))`;default:throw new Error(`Not supported compoents ${l}`)}},E=D("input",t[0].dataType,t[0].dims,l),C=j("output",t[0].dataType,n,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${I(0)}, ${I(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:S},{inputs:[t[0],v]})},Jh=(e,t)=>{t.format==="NHWC"?Jl(e,e.inputs,t):Yl(e,e.inputs,t)}}),ed,td,ef,py=M(()=>{"use strict";ee(),re(),ie(),ed=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},td=(e,t,r)=>{let i=t.simplified,n=e[0].dims,a=e[1],s=!i&&e[2],u=n,l=B.normalizeAxis(t.axis,n.length),p=B.sizeToDimension(n,l),c=B.sizeFromDimension(n,l),m=B.size(a.dims),g=s?B.size(s.dims):0;if(m!==c||s&&g!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${m} and bias size of ${g}`);let _=[];for(let E=0;E<n.length;++E)E<l?_.push(n[E]):_.push(1);let y=ve(c),v=["type","type"],S=[{type:12,data:p},{type:1,data:c},{type:12,data:Math.floor(c/y)},{type:1,data:t.epsilon}];s&&v.push("type");let $=r>1,w=r>2,T=E=>{let C=Ce(e[0].dataType),z=[D("x",e[0].dataType,e[0].dims,y),D("scale",a.dataType,a.dims,y)];s&&z.push(D("bias",s.dataType,s.dims,y)),z.push(j("output",e[0].dataType,u,y)),$&&z.push(j("mean_data_output",1,_)),w&&z.push(j("inv_std_output",1,_));let x=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms(x).declareVariables(...z)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Bn("f32",y)};
    var mean_square_vector = ${Bn("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Ht(C,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${wt("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${wt("mean_square_vector",y)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ht(C,y,"x[j + offset]")};
      let f32scale = ${Ht(C,y,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Ht(C,y,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},I=[{dims:u,dataType:e[0].dataType}];return $&&I.push({dims:_,dataType:1}),w&&I.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${i}`,inputDependencies:v},getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:S}),getShaderSource:T}},ef=(e,t)=>{ed(e.inputs),e.compute(td(e.inputs,t,e.outputCount))}}),rd,tf,cy=M(()=>{"use strict";re(),fa(),ma(),rd=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},tf=e=>{rd(e.inputs);let t=Ft.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(ha(e.inputs,{activation:""},t));else{let n=t[t.length-2],a=B.size(e.inputs[0].dims.slice(0,-2)),s=B.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&n===1&&s===1){let u=e.inputs[0].reshape([1,a,i]),l=e.inputs[1].reshape([1,i,r]),p=[1,a,r],c=[u,l];e.compute(Xr(c,{activation:""},t,p),{inputs:c})}else e.compute(Xr(e.inputs,{activation:""},t))}}}),id,nd,ad,rf,nf,hy=M(()=>{"use strict";ee(),re(),xe(),ie(),id=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!B.areEqual(s.dims,[t.n,n,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(B.size(u)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,p=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(B.size(l)!==p)throw new Error("zeroPoints input size error.")}},nd=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,u=r.slice(0,i-2),l=B.size(u),p=e[1].dims[2]/4,c=e[0].dataType,m=ve(t.k),g=ve(p),_=ve(s),y=u.concat([n,s]),v=n>1&&s/_%2===0?2:1,S=B.size(y)/_/v,$=64,w=[],T=[l,n,a/m],I=B.convertShape(e[1].dims).slice();I.splice(-1,1,p/g),w.push(...Z(T)),w.push(...Z(I)),w.push(...Z(e[2].dims)),e.length===4&&w.push(...Z(B.convertShape(e[3].dims)));let E=[l,n,s/_];w.push(...Z(E));let C=z=>{let x=T.length,N=D("a",e[0].dataType,x,m),L=D("b",12,I.length,g),X=D("scales",e[2].dataType,e[2].dims.length),Q=[N,L,X],J=e.length===4?D("zero_points",12,e[3].dims.length):void 0;J&&Q.push(J);let O=E.length,W=j("output",e[0].dataType,O,_),Y=Ce(e[0].dataType),P=(()=>{switch(m){case 1:return`array<${Y}, 8>`;case 2:return`mat4x2<${Y}>`;case 4:return`mat2x4<${Y}>`;default:throw new Error(`${m}-component is not supported.`)}})(),se=Math.floor(32/t.bits),ne=Math.floor(se/8),te=()=>{let F="";for(let V=0;V<ne;V++){let Se=V*t.bits*4,Ve=Se+t.bits;F+=`
          // reuse a data (pass ${V})
            var input_offset${V>0?V:""} = ${V===0?N.indicesToOffset(`${N.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${V>0?V:""}: ${P};
            for (var j${V>0?V:""}: u32 = 0; j${V>0?V:""} < ${8/m}; j${V>0?V:""}++) {
              a_data${V>0?V:""}[j${V>0?V:""}] = ${N.getByOffset(`input_offset${V>0?V:""}`)};
              input_offset${V>0?V:""}++;
            }
          `;for(let ze=0;ze<_*v;ze++)F+=`
            b_value = ${g===1?`b${ze}_data`:`b${ze}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${V*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${Se}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ve}u) & b_mask);`}
            b_quantized_values = ${P}(${Array.from({length:4},(Ie,ke)=>`${Y}(b_value_lower[${ke}]), ${Y}(b_value_upper[${ke}])`).join(", ")});
            b_dequantized_values = ${m===1?`${P}(${Array.from({length:8},(Ie,ke)=>`(b_quantized_values[${ke}] - ${J?`zero_point${ze}`:"zero_point"}) * scale${ze}`).join(", ")});`:`(b_quantized_values - ${P}(${Array(8).fill(`${J?`zero_point${ze}`:"zero_point"}`).join(",")})) * scale${ze};`};
            workgroup_shared[local_id.x * ${v} + ${Math.floor(ze/_)}]${_>1?`[${ze%_}]`:""} += ${Array.from({length:8/m},(Ie,ke)=>`${m===1?`a_data${V>0?V:""}[${ke}] * b_dequantized_values[${ke}]`:`dot(a_data${V>0?V:""}[${ke}], b_dequantized_values[${ke}])`}`).join(" + ")};
          `}return F},U=()=>{let F=`
            var col_index = col * ${_};
            ${J?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${Y}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let V=0;V<_*v;V++)F+=`
            let scale${V} = ${X.getByOffset("col_index * nBlocksPerCol + block")};
            ${J?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${Y}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return F},H=()=>{let F=`col_index = col * ${_};`;for(let V=0;V<_*v;V++)F+=`
            let b${V}_data = ${L.getByIndices(`${L.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return F+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${P};
            var b_dequantized_values: ${P};`,F};return`
        var<workgroup> workgroup_shared: array<${W.type.value}, ${v*$}>;
        ${z.declareVariables(...Q,W)}
        ${z.mainStart([$,1,1])}
          let output_indices = ${W.offsetToIndices(`(global_idx / ${$}) * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/m};
            ${U()}
            for (var word: u32 = 0; word < ${p}; word += ${g}) {
              ${H()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${te()}
                word_offset += ${se/m};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${v}) {
            var output_value: ${W.type.value} = ${W.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${v};
            }
            ${W.setByIndices(`${W.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${m};${g};${_};${v};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:c}],dispatchGroup:{x:S},programUniforms:w}),getShaderSource:C}},ad=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,u=r.slice(0,i-2),l=B.size(u),p=e[1].dims[2]/4,c=e[0].dataType,m=ve(t.k),g=ve(p),_=u.concat([n,s]),y=128,v=s%8===0?8:s%4===0?4:1,S=y/v,$=Math.floor(32/t.bits),w=S*g*$,T=w/m,I=w/t.blockSize,E=B.size(_)/v,C=[],z=[l,n,a/m],x=B.convertShape(e[1].dims).slice();x.splice(-1,1,p/g),C.push(...Z(z)),C.push(...Z(x)),C.push(...Z(e[2].dims)),e.length===4&&C.push(...Z(B.convertShape(e[3].dims)));let N=[l,n,s];C.push(...Z(N));let L=X=>{let Q=z.length,J=D("a",e[0].dataType,Q,m),O=D("b",12,x.length,g),W=D("scales",e[2].dataType,e[2].dims.length),Y=[J,O,W],P=e.length===4?D("zero_points",12,e[3].dims.length):void 0;P&&Y.push(P);let se=N.length,ne=j("output",e[0].dataType,se),te=Ce(e[0].dataType),U=()=>{switch(m){case 1:return`
          let a_data0 = vec4<${te}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${te}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${te}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${te}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${m}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${J.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${ne.type.value}, ${S}>, ${v}>;
        ${X.declareVariables(...Y,ne)}
        ${X.mainStart([S,v,1])}
          let output_indices = ${ne.offsetToIndices(`workgroup_index * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${I} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${y})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${J.getByIndices(`${J.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${J.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${I} + local_id.x;
            ${P?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${P.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${te}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${te}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${W.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${O.getByIndices(`${O.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/m};
            for (var i: u32 = 0; i < ${g}; i++) {
              let b_value = ${g===1?"b_data":"b_data[i]"};
              ${(()=>{let H=Math.floor($/8),F="";for(let V=0;V<H;V++){let Se=V*t.bits*4,Ve=Se+t.bits;F+=`
              ${U()}
              {${t.bits===2?`
                let half_word = b_value >> ${V*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${Se}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ve}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${te}>(${Array.from({length:4},(ze,Ie)=>`${te}(b_value_lower[${Ie}]), ${te}(b_value_upper[${Ie}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${te}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(ze,Ie)=>`${`dot(a_data${Ie}, b_dequantized_values[${Ie}])`}`).join(" + ")};
              }
              word_offset += ${8/m};`}return F})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${v}) {
            var output_value: ${ne.type.value} = ${ne.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ne.setByIndices(`${ne.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${m};${g};${S};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:c}],dispatchGroup:{x:E},programUniforms:C}),getShaderSource:L}},rf=(e,t)=>{id(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(ad(e.inputs,t)):e.compute(nd(e.inputs,t))},nf=e=>fe(e)}),sd,od,ud,ld,dd,pd,cd,hd,af,fy=M(()=>{"use strict";ee(),re(),ie(),sd=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},od=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},ud=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},ld=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape",n,t)})) {
                  k = i32(${K("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},dd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${K("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${K("uniforms.x_shape",n,t)})) {
                  k -= i32(${K("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${K("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},pd=(e,t,r)=>{switch(r.mode){case 0:return od(e,t,r.pads.length);case 1:return ud(e,t,r.pads.length);case 2:return ld(e,t,r.pads.length);case 3:return dd(e,t,r.pads.length);default:throw new Error("Invalid mode")}},cd=(e,t)=>{let r=B.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=B.size(r),a=[{type:12,data:n},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...Z(e[0].dims,r));let u=["rank"],l=p=>{let c=j("output",e[0].dataType,r.length),m=D("x",e[0].dataType,i.length),g=m.type.value,_=pd(c,i.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:s?g:"f32"}),`
            ${p.registerUniforms(y).declareVariables(m,c)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(r)/64)},programUniforms:a}),getShaderSource:l}},hd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,a=new Int32Array(2*n).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)a[Number(u[l])]=Number(r[l]),a[Number(u[l])+n]=Number(r[l+u.length])}else r.forEach((u,l)=>a[Number(l)]=Number(u));let s=[];return a.forEach(u=>s.push(u)),{mode:t.mode,value:i,pads:s}}else return t},af=(e,t)=>{sd(e.inputs);let r=hd(e.inputs,t);e.compute(cd(e.inputs,r),{inputs:[0]})}}),sr,hn,fn,mn,gn,fd,md,yn,_n,sf,of,wn,uf,lf,$n,df,pf,cf,hf,my=M(()=>{"use strict";Pe(),ee(),re(),ie(),sr=e=>{if(we.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},hn=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=a?t.dilations.slice():[],p=t.pads.slice();Zr.adjustPoolAttributes(r,n,s,u,l,p);let c=Zr.computePoolOutputShape(r,n,u,l,s,p,t.autoPad,t.ceilMode),m=Object.assign({},t);a?Object.assign(m,{kernelShape:s,strides:u,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(m,{kernelShape:s,strides:u,pads:p,cacheKey:t.cacheKey});let g=c.slice();return g.push(g.splice(1,1)[0]),[m,i?g:c]},fn=(e,t)=>{let r=t.format==="NHWC",i=B.size(e),n=B.size(t.kernelShape),a=[{type:12,data:i},{type:12,data:n}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],m=!!(p+c);a.push({type:12,data:u},{type:12,data:l},{type:12,data:p},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],v=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];g=!!(v+S),a.push({type:12,data:_},{type:12,data:y},{type:12,data:v},{type:12,data:S}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,m,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=B.computeStrides(t.kernelShape);a.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,c)=>p+c);return[a,s,!!l,!1,!1]}},mn=(e,t,r,i,n,a,s,u,l,p,c,m)=>{let g=n.format==="NHWC",_=t.type.value,y=j("output",t.type.tensor,i);if(n.kernelShape.length<=2){let v="",S="",$="",w=r-(g?2:1);if(c?v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,n.kernelShape.length===2){let T=r-(g?3:2);m?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${_}(${u});
              var pad = 0;
              ${S}
              ${v}
              ${$}
              ${s}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let v=n.kernelShape.length,S=n.pads.length,$="";return p?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${v}>;

              var value = ${_}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${v-1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides","j",v)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides","j",v)};
                }
                offsets[${v-1}] = offset;

                isPad = false;
                for (var j = ${r-v}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides",`j - ${r-v}u`,v)}
                    + offsets[j - ${r-v}u] - ${K("uniforms.pads","j - 2u",S)};
                  ${$}
              }
              ${s}

              output[global_idx] = value;
            }`}},gn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,fd=e=>`${gn(e)};${e.countIncludePad}`,md=e=>`${gn(e)};${e.storageOrder};${e.dilations}`,yn=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),_n=(e,t,r,i)=>{let[n,a]=hn(t,i,r),s=D("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",p="";n.countIncludePad?p+=`value /= ${u}(uniforms.kernelSize);`:p+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[c,m,g,_,y]=fn(a,n);c.push(...Z(t.dims,a));let v=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${g};${_};${y}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(a)/64)},programUniforms:c}),getShaderSource:S=>mn(S,s,t.dims.length,a.length,n,l,p,0,m,g,_,y)}},sf=e=>{let t=e.count_include_pad!==0,r=yn(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:fd(i)}},of=(e,t)=>{sr(e.inputs),e.compute(_n("AveragePool",e.inputs[0],!1,t))},wn={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},uf=e=>{let t=e.format;return{format:t,...wn,cacheKey:t}},lf=(e,t)=>{sr(e.inputs),e.compute(_n("GlobalAveragePool",e.inputs[0],!0,t))},$n=(e,t,r,i)=>{let[n,a]=hn(t,i,r),s=`
      value = max(x_val, value);
    `,u="",l=D("x",t.dataType,t.dims.length),p=["rank"],[c,m,g,_,y]=fn(a,n);return c.push(...Z(t.dims,a)),{name:e,shaderCache:{hint:`${i.cacheKey};${g};${_};${y}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(a)/64)},programUniforms:c}),getShaderSource:v=>mn(v,l,t.dims.length,a.length,n,s,u,t.dataType===10?-65504:-1e5,m,g,_,y)}},df=(e,t)=>{sr(e.inputs),e.compute($n("MaxPool",e.inputs[0],!1,t))},pf=e=>{let t=e.storage_order,r=e.dilations,i=yn(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:md(n)}},cf=e=>{let t=e.format;return{format:t,...wn,cacheKey:t}},hf=(e,t)=>{sr(e.inputs),e.compute($n("GlobalMaxPool",e.inputs[0],!0,t))}}),gd,yd,ff,mf,gy=M(()=>{"use strict";ee(),re(),xe(),ie(),gd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,a)=>a===t.axis||n===e[0].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},yd=(e,t)=>{let r=B.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,a=e[0].dims,s=e[1].dataType,u=B.size(a),l=i===3||i===2,p=l?[Math.ceil(B.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,m=e.length>2?e[2]:void 0,g=m?l?[Math.ceil(B.size(m.dims)/4)]:m.dims:void 0,_=c.length===0||c.length===1&&c[0]===1,y=_===!1&&c.length===1,v=ve(u),S=_&&(!l||v===4),$=S?v:1,w=S&&!l?v:1,T=D("input",l?12:i,p.length,w),I=D("scale",s,c.length),E=m?D("zero_point",l?12:i,g.length):void 0,C=j("output",s,a.length,$),z=[T,I];E&&z.push(E);let x=[p,c];m&&x.push(g);let N=[{type:12,data:u/$},{type:12,data:r},{type:12,data:t.blockSize},...Z(...x,a)],L=X=>{let Q=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${X.registerUniforms(Q).declareVariables(...z,C)}
      ${X.mainStart()}
          ${X.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${I.getByOffset("0")}`:y?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${I.getByOffset("scale_index")};`:`
            var scale_indices: ${I.type.indices} = output_indices;
            let index = ${I.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${I.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${I.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?_?l?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:y?l?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${I.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${l?n?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:L,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(u/$/64),y:1,z:1},programUniforms:N})}},ff=(e,t)=>{gd(e.inputs,t),e.compute(yd(e.inputs,t))},mf=e=>fe({axis:e.axis,blockSize:e.blockSize})}),_d,wd,gf,yy=M(()=>{"use strict";Pe(),ee(),ie(),_d=(e,t,r)=>{let i=e===t,n=e<t&&r<0,a=e>t&&r>0;if(i||n||a)throw new Error("Range these inputs' contents are invalid.")},wd=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),a=[n],s=n,u=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...Z(a)],l=p=>{let c=j("output",i,a.length),m=c.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:m},{name:"delta",type:m}];return`
        ${p.registerUniforms(g).declareVariables(c)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${m}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},gf=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),we.webgpu.validateInputContent&&_d(t,r,i),e.compute(wd(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),$d,bd,yf,_f,_y=M(()=>{"use strict";ee(),re(),xe(),ie(),$d=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${n}bitcast<${i}>(oldValue) + (${r})${a}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${a}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},bd=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,a=1,s=Math.ceil(B.sizeToDimension(i,i.length-1)/a),u=i[i.length-1],l=B.sizeFromDimension(r,u),p=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...Z(e[1].dims,e[2].dims,n)],c=m=>{let g=D("indices",e[1].dataType,e[1].dims.length),_=D("updates",e[2].dataType,e[2].dims.length,a),y=t.reduction!=="none"&&t.reduction!==""?Wp("output",e[0].dataType,n.length):j("output",e[0].dataType,n.length,a);return`
      ${m.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,_,y)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${$d(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:c}},yf=e=>fe({reduction:e.reduction}),_f=(e,t)=>{e.compute(bd(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),vd,xd,Sd,bn,kd,Td,Id,Ed,Cd,zd,Ad,Od,vn,Bd,Rd,Dd,Nd,Md,wf,$f,wy=M(()=>{"use strict";ee(),re(),xe(),ie(),vd=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},xd=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,a)=>i[n]=e[a]),i},Sd=(e,t,r,i,n,a)=>{let[s,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(c=>i.push(c)),i.length!==0&&i.length!==p&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");vd(i,t),t.axes.length>0&&xd(i,t.axes,p).forEach((c,m)=>i[m]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>n.push(Number(c))),n.length!==0&&n.length!==p&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},bn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,kd=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${bn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${bn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Td=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Id=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((a,s)=>{i[a]=n[s],i[s+r]=n[t.length+s]}),i):n},Ed=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(a=>n.push(a)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((a,s)=>n[a]=r[s])}else r.forEach(a=>n.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((a,s)=>Math.round(a*t[s]))}return n},Cd=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=i),r.axes.forEach(a=>n[a]=Math.round(e[a]*t[a]))):(t.fill(i,0,t.length),n.forEach((a,s)=>n[s]=Math.round(a*t[s]))),n},zd=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${K("uniforms.scales","i",i)};
        var roi_low = ${K("uniforms.roi","i",n)};
        var roi_hi = ${K("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${K("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Ad=(e,t,r,i,n,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi","i",a)};
          var roi_hi = ${K("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${K("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Od=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,vn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Bd=(e,t,r,i,n)=>{let[a,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${vn(e,l,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Rd=(e,t,r,i,n,a,s,u,l,p)=>{let c=r.length===2,m=!0,[g,_]=c?[0,1]:m?[2,3]:[1,2],y=e.type.value,v=S=>{let $=S===g?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[S]},
        ${i[S]}, ${r[S]}, ${a[S]}, ${a[S]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[S]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${y} = originalIdx + ${y}(i);
          if (${$} < 0 || ${$} >= ${r[S]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${$} = max(0, min(${$}, ${r[S]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${$})`)};
          data[i + 1] = ${S===g?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${v(g)};
    ${v(_)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Dd=(e,t,r,i,n)=>{let[a,s,u,l,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${vn(e,p,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Nd=(e,t,r,i,n,a)=>{let s=e.dims,u=Id(a,t.axes,s.length),l=Ed(s,i,n,t.axes),p=i.slice();i.length===0&&(p=s.map((w,T)=>w===0?1:l[T]/w),t.keepAspectRatioPolicy!=="stretch"&&(l=Cd(s,p,t)));let c=j("output",e.dataType,l.length),m=D("input",e.dataType,s.length),g=B.size(l),_=s.length===l.length&&s.every((w,T)=>w===l[T]),y=t.coordinateTransformMode==="tf_crop_and_resize",v=t.extrapolationValue,S=m.type.value,$=w=>`
      ${_?"":`
      ${kd(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Od(m,s)};
              ${Td(t.nearestMode,r,S)};
              ${Ad(m,c,s,l,p.length,u.length,y)};
              `;case"linear":return`
              ${zd(c,s,l,p.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Bd(m,c,s,y,v)}`;if(s.length===3||s.length===5)return`${Dd(m,c,s,y,v)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Rd(m,c,s,l,p,u,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",u.length).declareVariables(m,c)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${m.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${m.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${n.length>0?n:""}|${u.length>0?u:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:p},{type:1,data:u},...Z(s,l)]})}},Md=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},wf=(e,t)=>{let r=[],i=[],n=[],a=Md(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Sd(e.inputs,t,a,r,i,n),e.compute(Nd(e.inputs[0],t,a,r,i,n),{inputs:[0]})},$f=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return fe({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:p})}}),Ud,Pd,bf,$y=M(()=>{"use strict";ee(),re(),ie(),Ud=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},Pd=(e,t,r,i)=>{let n=t.simplified,a=e[0].dims,s=B.size(a),u=a,l=s,p=a.slice(-1)[0],c=i?a.slice(0,-1).concat(1):[],m=!n&&e.length>3,g=e.length>4,_=i&&r>1,y=i&&r>2,v=r>3,S=64,$=ve(p),w=[{type:12,data:l},{type:12,data:$},{type:12,data:p},{type:1,data:t.epsilon}],T=E=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[D("x",e[0].dataType,e[0].dims,$),D("skip",e[1].dataType,e[1].dims,$),D("gamma",e[2].dataType,e[2].dims,$)];m&&z.push(D("beta",e[3].dataType,e[3].dims,$)),g&&z.push(D("bias",e[4].dataType,e[4].dims,$)),z.push(j("output",e[0].dataType,u,$)),_&&z.push(j("mean_output",1,c)),y&&z.push(j("inv_std_output",1,c)),v&&z.push(j("input_skip_bias_sum",e[0].dataType,u,$));let x=Ce(e[0].dataType),N=Ce(1,$);return`

      ${E.registerUniforms(C).declareVariables(...z)}
      var<workgroup> sum_shared : array<${N}, ${S}>;
      var<workgroup> sum_squared_shared : array<${N}, ${S}>;

      ${E.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":x+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${v?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Ht(x,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${wt("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${wt("square_sum",$)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${x}(mean)`}) *
            ${x}(inv_std_dev) * gamma[offset1d + i]
            ${m?"+ beta[offset1d + i]":""};
        }
      }`},I=[{dims:u,dataType:e[0].dataType}];return r>1&&I.push({dims:c,dataType:1}),r>2&&I.push({dims:c,dataType:1}),r>3&&I.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${_};${y};${v}`,inputDependencies:e.map((E,C)=>"type")},getShaderSource:T,getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:w})}},bf=(e,t)=>{Ud(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Pd(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Ld,or,qd,xn,Wd,Vd,vf,xf,by=M(()=>{"use strict";ee(),re(),xe(),ie(),Ld=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},or=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},qd=(e,t)=>{if(e.length>1){let r=or(e,1),i=or(e,2),n=or(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),fe({starts:r,ends:i,axes:n})}else return t},xn=(e,t,r,i,n)=>{let a=e;return e<0&&(a+=r[i[t]]),n[t]<0?Math.max(0,Math.min(a,r[i[t]]-1)):Math.max(0,Math.min(a,r[i[t]]))},Wd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${K("uniforms.input_shape","i",r.length)};
            let steps_i = ${K("uniforms.steps","i",r.length)};
            let signs_i = ${K("uniforms.signs","i",r.length)};
            let starts_i = ${K("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Vd=(e,t)=>{let r=e[0].dims,i=B.size(r),n=t.axes.length>0?B.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=or(e,4);a.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(n.length).fill(1));let s=t.starts.map(($,w)=>xn($,w,r,n,a)),u=t.ends.map(($,w)=>xn($,w,r,n,a));if(n.length!==s.length||n.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let $=0;$<r.length;++$)n.includes($)||(s.splice($,0,0),u.splice($,0,r[$]),a.splice($,0,1));let l=a.map($=>Math.sign($));a.forEach(($,w,T)=>{if($<0){let I=(u[w]-s[w])/$,E=s[w],C=E+I*a[w];s[w]=C,u[w]=E,T[w]=-$}});let p=r.slice(0);n.forEach(($,w)=>{p[$]=Math.ceil((u[$]-s[$])/a[$])});let c={dims:p,dataType:e[0].dataType},m=j("output",e[0].dataType,p.length),g=D("input",e[0].dataType,e[0].dims.length),_=B.size(p),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],v=[{type:12,data:_},{type:12,data:s},{type:6,data:l},{type:12,data:a},...Z(e[0].dims,p)],S=$=>`
      ${$.registerUniforms(y).declareVariables(g,m)}
        ${Wd(g,m,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${m.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${m.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:v})}},vf=(e,t)=>{Ld(e.inputs,t);let r=qd(e.inputs,t);e.compute(Vd(e.inputs,r),{inputs:[0]})},xf=e=>{let t=e.starts,r=e.ends,i=e.axes;return fe({starts:t,ends:r,axes:i})}}),Gd,Hd,Sf,kf,vy=M(()=>{"use strict";ee(),re(),xe(),$t(),ie(),Gd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Hd=(e,t)=>{let r=e.inputs[0],i=r.dims,n=B.size(i),a=i.length,s=B.normalizeAxis(t.axis,a),u=s<i.length-1,l,p=[];u?(p=Array.from({length:a},(z,x)=>x),p[s]=a-1,p[a-1]=s,l=e.compute(Ue(r,p),{inputs:[r],outputs:[-1]})[0]):l=r;let c=l.dims,m=c[a-1],g=n/m,_=ve(m),y=m/_,v=64;g===1&&(v=256);let S=(z,x)=>x===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:x===2?`max(${z}.x, ${z}.y)`:x===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,$=D("x",l.dataType,l.dims,_),w=j("result",l.dataType,l.dims,_),T=$.type.value,I=Ce(l.dataType)==="f32"?`var threadMax = ${T}(-3.4028234663852886e+38f);`:`var threadMax = ${T}(-65504.0h);`,E=z=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${v}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables($,w)}
      ${z.mainStart(v)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${v};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${I}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${T}(${S("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${T}(${wt("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${_};${v}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:y}]}),getShaderSource:E},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Ue(C,p),{inputs:[C]})},Sf=(e,t)=>{Gd(e.inputs),Hd(e,t)},kf=e=>fe({axis:e.axis})}),Sn,Fd,jd,Kd,Tf,xy=M(()=>{"use strict";ee(),re(),ie(),Sn=e=>Array.from(e.getBigInt64Array(),Number),Fd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Sn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},jd=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Kd=(e,t)=>{let r=e[0].dims,i=t??Sn(e[1]),n=jd(r,i),a=B.size(n),s=e[0].dataType,u=D("input",s,r.length),l=j("output",s,n.length),p=c=>`
      const inputShape = ${u.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(u,l)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...Z(e[0].dims,n)]}),getShaderSource:p}},Tf=e=>{Fd(e.inputs),e.compute(Kd(e.inputs),{inputs:[0]})}}),Zd,Qd,If,Sy=M(()=>{"use strict";ee(),re(),ie(),Zd=(e,t,r,i,n)=>{let a=j("output_data",n,r.length,4),s=D("a_data",t[1].dataType,t[1].dims.length,4),u=D("b_data",t[2].dataType,t[2].dims.length,4),l=D("c_data",t[0].dataType,t[0].dims.length,4),p,c=(m,g,_)=>`select(${g}, ${m}, ${_})`;if(!i)p=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let m=(g,_,y="")=>{let v=`a_data[index_a${_}][component_a${_}]`,S=`b_data[index_b${_}][component_b${_}]`,$=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${a.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_b${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_c${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${g}[${_}] = ${y}(${c(v,S,$)});
          `};n===9?p=`
            var data = vec4<u32>(0);
            ${m("data",0,"u32")}
            ${m("data",1,"u32")}
            ${m("data",2,"u32")}
            ${m("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${m("output_data[global_idx]",0)}
            ${m("output_data[global_idx]",1)}
            ${m("output_data[global_idx]",2)}
            ${m("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Qd=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,a=!(B.areEqual(t,r)&&B.areEqual(r,i)),s=t,u=B.size(t);if(a){let p=Ft.calcShape(Ft.calcShape(t,r,!1),i,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,u=B.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Zd(p,e,s,a,n),getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...Z(i,t,r,s)]})}},If=e=>{e.compute(Qd(e.inputs))}}),Ef,ky=M(()=>{"use strict";U0(),la(),P0(),L0(),q0(),W0(),V0(),K0(),Q0(),X0(),Y0(),J0(),ey(),ty(),ry(),iy(),ny(),ay(),sy(),oy(),uy(),ly(),dy(),py(),cy(),hy(),Fh(),fy(),my(),gy(),yy(),_y(),ua(),wy(),Xh(),$y(),by(),vy(),Zh(),xy(),$t(),da(),Sy(),Ef=new Map([["Abs",[yc]],["Acos",[_c]],["Acosh",[wc]],["Add",[eh]],["ArgMax",[hc,Dn]],["ArgMin",[cc,Dn]],["Asin",[$c]],["Asinh",[bc]],["Atan",[vc]],["Atanh",[xc]],["Attention",[fc]],["AveragePool",[of,sf]],["BatchNormalization",[mc]],["BiasAdd",[gc]],["BiasSplitGelu",[Jc]],["Cast",[kc,Sc]],["Ceil",[Ic]],["Clip",[Tc]],["Concat",[dh,ph]],["Conv",[qn,Ln]],["ConvTranspose",[bh,$h]],["Cos",[Ec]],["Cosh",[Cc]],["CumSum",[vh,xh]],["DepthToSpace",[Sh,kh]],["DequantizeLinear",[ff,mf]],["DFT",[Th,Ih]],["Div",[th]],["Einsum",[Eh,Ch]],["Elu",[zc,cr]],["Equal",[rh]],["Erf",[Ac]],["Exp",[Oc]],["Expand",[zh]],["FastGelu",[Ah]],["Floor",[Bc]],["FusedConv",[qn,Ln]],["Gather",[Bh,Oh]],["GatherElements",[Ph,Uh]],["GatherBlockQuantized",[Nh,Mh]],["GatherND",[Rh,Dh]],["Gelu",[Rc]],["Gemm",[qh,Lh]],["GlobalAveragePool",[lf,uf]],["GlobalMaxPool",[hf,cf]],["Greater",[sh]],["GreaterOrEqual",[uh]],["GridSample",[Wh,Vh]],["GroupQueryAttention",[Yh]],["HardSigmoid",[Wc,qc]],["HardSwish",[Vc]],["InstanceNormalization",[Jh]],["LayerNormalization",[ef]],["LeakyRelu",[Dc,cr]],["Less",[oh]],["LessOrEqual",[lh]],["Log",[Xc]],["MatMul",[tf]],["MatMulNBits",[rf,nf]],["MaxPool",[df,pf]],["Mul",[ih]],["MultiHeadAttention",[Hh,Gh]],["Neg",[Mc]],["Not",[Nc]],["Pad",[af]],["Pow",[nh]],["QuickGelu",[Yc,cr]],["Range",[gf]],["Reciprocal",[Uc]],["ReduceMin",[oc]],["ReduceMean",[rc]],["ReduceMax",[sc]],["ReduceSum",[lc]],["ReduceProd",[uc]],["ReduceL1",[ic]],["ReduceL2",[nc]],["ReduceLogSum",[pc]],["ReduceLogSumExp",[ac]],["ReduceSumSquare",[dc]],["Relu",[Pc]],["Resize",[wf,$f]],["RotaryEmbedding",[Qh]],["ScatterND",[_f,yf]],["Sigmoid",[Lc]],["Sin",[Gc]],["Sinh",[Hc]],["Slice",[vf,xf]],["SkipLayerNormalization",[bf]],["Split",[jh,Kh]],["Sqrt",[Fc]],["Softmax",[Sf,kf]],["Sub",[ah]],["Tan",[jc]],["Tanh",[Kc]],["ThresholdedRelu",[Qc,cr]],["Tile",[Tf]],["Transpose",[Gp,Hp]],["Where",[If]]])}),Cf,Ty=M(()=>{"use strict";Pe(),dt(),ie(),Cf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){We(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of r)u.push({binding:u.length,resource:{buffer:p.buffer}});n&&u.push({binding:u.length,resource:n});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Me(e.programInfo.name)}dispose(){}build(e,t){We(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{r.features.has(p.feature)&&i.push(`enable ${p.extension};`)});let n=Vp(t,this.backend.device.limits),a=e.getShaderSource(n),s=`${i.join(`
`)}
${n.additionalImplementations}
${a}`,u=r.createShaderModule({code:s,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Me(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let a=t*r*i,s=Math.ceil(Math.sqrt(a));if(s>n){if(s=Math.ceil(Math.cbrt(a)),s>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),zf={};Kt(zf,{WebGpuBackend:()=>Af});var Xd,Yd,Jd,Af,Iy=M(()=>{"use strict";Pe(),ee(),dt(),Up(),N0(),ky(),Ty(),Xd=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let a=e[i].dims.length;r.push(`${n};${a}`);break}case"dims":{let a=e[i].dims.join(",");r.push(`${n};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Yd=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Xd(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Jd=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Af=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=u=>t.features.has(u)&&r.push(u)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i);let a=t,s=t.info??(typeof a.requestAdapterInfo=="function"?await a.requestAdapterInfo():void 0);this.adapterInfo=new Jd(s),this.gpuDataManager=qp(this),this.programManager=new Cf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,na(e.logLevel,!!e.debug),this.device.onuncapturederror=u=>{u.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${u.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;We(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let n=r[i],a=n.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,p=n.programName,c=n.inputTensorViews,m=n.outputTensorViews,g=t[i*2],_=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let y=Number(g-this.queryTimeBase),v=Number(_-this.queryTimeBase);if(!Number.isSafeInteger(y)||!Number.isSafeInteger(v))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(S=>({dims:S.dims,dataType:lt(S.dataType)})),outputsMetadata:m.map(S=>({dims:S.dims,dataType:lt(S.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:p,startTime:y,endTime:v});else{let S="";c.forEach((w,T)=>{S+=`input[${T}]: [${w.dims}] | ${lt(w.dataType)}, `});let $="";m.forEach((w,T)=>{$+=`output[${T}]: [${w.dims}] | ${lt(w.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${p}" ${S}${$}start time: ${y} ns, execution time: ${v-y} ns`)}Fr("GPU",`${p}::${g}::${_}`)}e.unmap(),this.pendingQueries.delete(e)}),Me()}run(e,t,r,i,n,a){We(e.name);let s=[];for(let w=0;w<t.length;++w){let T=t[w].data;if(T===0)continue;let I=this.gpuDataManager.get(T);if(!I)throw new Error(`no GPU data for input: ${T}`);s.push(I)}let{outputs:u,dispatchGroup:l,programUniforms:p}=e.getRunData(t),c=r.length===0?u.map((w,T)=>T):r;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let m=[],g=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(c[w])||c[w]<-3||c[w]>=a)throw new Error(`Invalid output index: ${c[w]}`);if(c[w]===-3)continue;let T=c[w]===-1,I=c[w]===-2,E=T||I?n(u[w].dataType,u[w].dims):i(c[w],u[w].dataType,u[w].dims);if(m.push(E),E.data===0)continue;let C=this.gpuDataManager.get(E.data);if(!C)throw new Error(`no GPU data for output: ${E.data}`);if(T&&this.temporaryData.push(C),I){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(C)}g.push(C)}if(s.length!==t.length||g.length!==m.length){if(g.length===0)return Me(e.name),m;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let _;if(p){let w=0,T=[];p.forEach(z=>{let x=typeof z.data=="number"?[z.data]:z.data;if(x.length===0)return;let N=z.type===10?2:4,L,X;z.type===10?(X=x.length>4?16:x.length>2?8:x.length*N,L=x.length>4?16:N*x.length):(X=x.length<=2?x.length*N:16,L=16),w=Math.ceil(w/X)*X,T.push(w);let Q=z.type===10?8:4;w+=x.length>4?Math.ceil(x.length/Q)*L:x.length*N});let I=16;w=Math.ceil(w/I)*I;let E=new ArrayBuffer(w);p.forEach((z,x)=>{let N=T[x],L=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(E,N,L.length).set(L);else if(z.type===12)new Uint32Array(E,N,L.length).set(L);else if(z.type===10)new Uint16Array(E,N,L.length).set(L);else if(z.type===1)new Float32Array(E,N,L.length).set(L);else throw new Error(`Unsupported uniform type: ${lt(z.type)}`)});let C=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,E,0,w),this.gpuDataManager.release(C.id),_={offset:0,size:w,buffer:C.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),v=y[1]===1&&y[2]===1,S=Yd(e,t,v),$=this.programManager.getArtifact(S);if($||($=this.programManager.build(e,y),this.programManager.setArtifact(S,$),de("info",()=>`[artifact] key: ${S}, programName: ${e.name}`)),p&&$.uniformVariablesInfo){if(p.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${p.length} in program "${$.programInfo.name}".`);for(let w=0;w<p.length;w++){let T=p[w],I=T.type,E=typeof T.data=="number"?1:T.data.length,[C,z]=$.uniformVariablesInfo[w];if(I!==C||E!==z)throw new Error(`Uniform variable ${w} mismatch: expect type ${C} with size ${z}, got type ${I} with size ${E} in program "${$.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${S}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:m};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run($,s,g,y,_),Me(e.name),m}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=Ef.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,a=i.kernelName,s=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${n}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${a}" failed. ${p}`)),1}finally{l&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${n}] ${a}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let a=n.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,a);return n.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await On(this,e,t);return aa(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),a=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(a.computePipeline),n.setBindGroup(0,a.bindGroup),n.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Of={};Kt(Of,{init:()=>Bf});var Lr,ep,Bf,Ey=M(()=>{"use strict";ee(),dt(),re(),D0(),Lr=class Rf{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(B.size(t)!==B.size(this.dims))throw new Error("Invalid new shape");return new Rf(this.module,this.dataType,this.data,t)}},ep=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceLimits=t.device.limits;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,a=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,a));let s=Number(e.getValue(i*n++,a));this.outputCount=Number(e.getValue(i*n++,a)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,a));let u=[];for(let l=0;l<s;l++){let p=Number(e.getValue(i*n++,a)),c=Number(e.getValue(i*n++,"*")),m=Number(e.getValue(i*n++,a)),g=[];for(let _=0;_<m;_++)g.push(Number(e.getValue(i*n++,a)));u.push(new Lr(e,p,c,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],n=(s,u,l)=>new Lr(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=Ot(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let p=l>0?this.backend.gpuDataManager.create(l).id:0;return new Lr(this.module,s,p,u)};return this.backend.run(e,r,i,n,a,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,n);for(let s=0;s<t.length;s++)this.module.setValue(a+i*(s+1),t[s],n);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Bf=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(Iy(),mr(zf)).WebGpuBackend,s=new a;await s.initialize(r,i),n("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,p,c=!1)=>{if(c)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(p)}`),s.memcpy(Number(u),Number(l));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let m=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(p));s.upload(Number(l),m)}},async(u,l,p)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${p}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(u,l,p)=>s.createKernel(u,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,p,c)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${l}`);let m=new ep(t,s,Number(l));return s.computeKernel(Number(u),m,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new Lp(r);n("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,u,l,p,c)=>a.ensureTensor(s,u,l,p,c),(s,u)=>{a.uploadTensor(s,u)},async(s,u)=>a.downloadTensor(s,u),(s,u)=>a.registerMLContext(s,u),!!r.trace])}}}),tp,ga,ya,yt,rp,kn,Jr,_a,wa,ur,ip,It,Df,Nf,Tn,$a,ba,va,Mf=M(()=>{"use strict";Pe(),O0(),B0(),ee(),Ut(),ea(),ia(),tp=(e,t)=>{me()._OrtInit(e,t)!==0&&he("Can't initialize onnxruntime.")},ga=async e=>{tp(e.wasm.numThreads,Kr(e.logLevel))},ya=async(e,t)=>{me().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:n}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(Ey(),mr(Of)).init;t==="webgpu"&&await i("webgpu",me(),e,r),t==="webnn"&&await i("webnn",me(),e)}},yt=new Map,rp=e=>{let t=me(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&he("Can't get session input/output count.");let a=i===4?"i32":"i64";return[Number(t.getValue(n,a)),Number(t.getValue(n+i,a))]}finally{t.stackRestore(r)}},kn=(e,t)=>{let r=me(),i=r.stackSave(),n=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&he("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));n=Number(r.getValue(s+a,"*"));let l=r.HEAP32[n/4];if(l===0)return[u,0];let p=r.HEAPU32[n/4+1],c=[];for(let m=0;m<p;m++){let g=Number(r.getValue(n+8+m*a,"*"));c.push(g!==0?r.UTF8ToString(g):Number(r.getValue(n+8+(m+p)*a,"*")))}return[u,l,c]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},Jr=e=>{let t=me(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},_a=async(e,t)=>{let r,i,n=me();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=Jr(e);let a=0,s=0,u=0,l=[],p=[],c=[];try{if([s,l]=await Rp(t),t?.externalData&&n.mountExternalData){let I=[];for(let E of t.externalData){let C=typeof E=="string"?E:E.path,z=typeof E=="string"?E:E.data;I.push(ti(z).then(x=>{n.mountExternalData(C,x)}))}await Promise.all(I)}for(let I of t?.executionProviders??[])if((typeof I=="string"?I:I.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof I!="string"){let E=I,C=E?.context,z=E?.gpuDevice,x=E?.deviceType,N=E?.powerPreference;C?n.currentContext=C:z?n.currentContext=await n.webnnCreateMLContext(z):n.currentContext=await n.webnnCreateMLContext({deviceType:x,powerPreference:N})}else n.currentContext=await n.webnnCreateMLContext();break}a=await n._OrtCreateSession(r,i,s),n.webgpuOnCreateSession?.(a),a===0&&he("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(a,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[m,g]=rp(a),_=!!t?.enableGraphCapture,y=[],v=[],S=[],$=[],w=[];for(let I=0;I<m;I++){let[E,C,z]=kn(a,I);E===0&&he("Can't get an input name."),p.push(E);let x=n.UTF8ToString(E);y.push(x),S.push(C===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:lt(C),shape:z})}for(let I=0;I<g;I++){let[E,C,z]=kn(a,I+m);E===0&&he("Can't get an output name."),c.push(E);let x=n.UTF8ToString(E);v.push(x),$.push(C===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:lt(C),shape:z});{if(_&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let N=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[x]??"cpu",L=n.webnnIsGraphOutput;if(N==="cpu"&&L&&L(a,x)){w.push("ml-tensor-cpu-output");continue}if(N!=="cpu"&&N!=="cpu-pinned"&&N!=="gpu-buffer"&&N!=="ml-tensor")throw new Error(`Not supported preferred output location: ${N}.`);if(_&&N!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${N}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(N)}}let T=null;return w.some(I=>I==="gpu-buffer"||I==="ml-tensor"||I==="ml-tensor-cpu-output")&&(u=n._OrtCreateBinding(a),u===0&&he("Can't create IO binding."),T={handle:u,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(I=>I==="ml-tensor-cpu-output"?"ml-tensor":I).map(I=>An(I))}),yt.set(a,[a,p,c,T,_,!1]),[a,y,v,S,$]}catch(m){throw p.forEach(g=>n._OrtFree(g)),c.forEach(g=>n._OrtFree(g)),u!==0&&n._OrtReleaseBinding(u)!==0&&he("Can't release IO binding."),a!==0&&n._OrtReleaseSession(a)!==0&&he("Can't release session."),m}finally{n._free(r),s!==0&&n._OrtReleaseSessionOptions(s)!==0&&he("Can't release session options."),l.forEach(m=>n._free(m)),n.unmountExternalData?.()}},wa=e=>{let t=me(),r=yt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,a,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&he("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&he("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(l=>t._OrtFree(l)),a.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&he("Can't release session."),yt.delete(e)},ur=new Map,ip=1,It=new Map,Df=e=>{let t=me(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a LoRA adapter. failed to allocate a buffer of size ${e.byteLength}.`);try{t.HEAPU8.set(e,r);let i=t._OrtCreateLoraAdapter(r,e.byteLength);i===0&&he("Can't create a LoRA adapter.");let n=ip++;return ur.set(n,i),n}finally{t._free(r)}},Nf=e=>{let t=me(),r=ur.get(e);if(r===void 0)throw new Error(`cannot release LoRA adapter. invalid adapter id: ${e}`);if(It.has(e))throw new Error(`cannot release LoRA adapter. the adapter is used by a run in progress. adapter id: ${e}`);t._OrtReleaseLoraAdapter(r)!==0&&he("Can't release LoRA adapter."),ur.delete(e)},Tn=async(e,t,r,i,n,a,s=!1)=>{if(!e){t.push(0);return}let u=me(),l=u.PTR_SIZE,p=e[0],c=e[1],m=e[3],g=m,_,y;if(p==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let $=e[2].gpuBuffer;y=Ot(At(p),c);{let w=u.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=w(i,a,$,y)}}else if(m==="ml-tensor"){let $=e[2].mlTensor;y=Ot(At(p),c);let w=u.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=w(i,$,At(p),c)}else{let $=e[2];if(Array.isArray($)){y=l*$.length,_=u._malloc(y),r.push(_);for(let w=0;w<$.length;w++){if(typeof $[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);u.setValue(_+w*l,Qe($[w],r),"*")}}else{let w=u.webnnIsGraphInput,T=u.webnnIsGraphOutput;if(p!=="string"&&w&&T){let I=u.UTF8ToString(n);if(w(i,I)||T(i,I)){let E=At(p);y=Ot(E,c),g="ml-tensor";let C=u.webnnCreateTemporaryTensor,z=u.webnnUploadTensor;if(!C||!z)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let x=await C(i,E,c);z(x,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),_=x}else y=$.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,y),_)}else y=$.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,y),_)}}let v=u.stackSave(),S=u.stackAlloc(4*c.length);try{c.forEach((w,T)=>u.setValue(S+T*l,w,l===4?"i32":"i64"));let $=u._OrtCreateTensor(At(p),_,y,S,c.length,An(g));$===0&&he(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push($)}finally{u.stackRestore(v)}},$a=async(e,t,r,i,n,a,s=[])=>{let u=me(),l=u.PTR_SIZE,p=yt.get(e);if(!p)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=p[0],m=p[1],g=p[2],_=p[3],y=p[4],v=p[5],S=[];if(s.length>0){if(_)throw new Error("LoRA adapters are not supported for a session that uses IO binding, e.g. when an output is preferred to be on GPU, or when the WebNN execution provider produces an output.");for(let O of s){let W=ur.get(O);if(W===void 0)throw new Error(`cannot run inference. invalid LoRA adapter id: ${O}`);S.push(W)}}let $=t.length,w=i.length,T=0,I=[],E=[],C=[],z=[],x=[],N=u.stackSave(),L=u.stackAlloc($*l),X=u.stackAlloc($*l),Q=u.stackAlloc(w*l),J=u.stackAlloc(w*l);try{for(let P of s)It.set(P,(It.get(P)??0)+1);[T,I]=Bp(a,S),Bt("wasm prepareInputOutputTensor");for(let P=0;P<$;P++)await Tn(r[P],E,z,e,m[t[P]],t[P],y);for(let P=0;P<w;P++)await Tn(n[P],C,z,e,g[i[P]],$+i[P],y);Rt("wasm prepareInputOutputTensor");for(let P=0;P<$;P++)u.setValue(L+P*l,E[P],"*"),u.setValue(X+P*l,m[t[P]],"*");for(let P=0;P<w;P++)u.setValue(Q+P*l,C[P],"*"),u.setValue(J+P*l,g[i[P]],"*");if(_&&!v){let{handle:P,outputPreferredLocations:se,outputPreferredLocationsEncoded:ne}=_;if(m.length!==$)throw new Error(`input count from feeds (${$}) is expected to be always equal to model's input count (${m.length}).`);Bt("wasm bindInputsOutputs");for(let te=0;te<$;te++){let U=t[te];await u._OrtBindInput(P,m[U],E[te])!==0&&he(`Can't bind input[${te}] for session=${e}.`)}for(let te=0;te<w;te++){let U=i[te];n[te]?.[3]?(x.push(C[te]),u._OrtBindOutput(P,g[U],C[te],0)!==0&&he(`Can't bind pre-allocated output[${te}] for session=${e}.`)):u._OrtBindOutput(P,g[U],0,ne[U])!==0&&he(`Can't bind output[${te}] to ${se[te]} for session=${e}.`)}Rt("wasm bindInputsOutputs"),yt.set(e,[c,m,g,_,y,!0])}u.jsepOnRunStart?.(c),u.webnnOnRunStart?.(c);let O;_?O=await u._OrtRunWithBinding(c,_.handle,w,Q,T):O=await u._OrtRun(c,X,L,$,J,w,Q,T),O!==0&&he("failed to call OrtRun().");let W=[],Y=[];Bt("wasm ProcessOutputTensor");for(let P=0;P<w;P++){let se=Number(u.getValue(Q+P*l,"*"));if(se===C[P]||x.includes(C[P])){W.push(n[P]),se!==C[P]&&u._OrtReleaseTensor(se)!==0&&he("Can't release tensor.");continue}let ne=u.stackSave(),te=u.stackAlloc(4*l),U=!1,H,F=0;try{u._OrtGetTensorData(se,te,te+l,te+2*l,te+3*l)!==0&&he(`Can't access output tensor data on index ${P}.`);let V=l===4?"i32":"i64",Se=Number(u.getValue(te,V));F=u.getValue(te+l,"*");let Ve=u.getValue(te+l*2,"*"),ze=Number(u.getValue(te+l*3,V)),Ie=[];for(let $e=0;$e<ze;$e++)Ie.push(Number(u.getValue(Ve+$e*l,V)));u._OrtFree(Ve)!==0&&he("Can't free memory for tensor dims.");let ke=Ie.reduce(($e,be)=>$e*be,1);H=lt(Se);let Ye=_?.outputPreferredLocations[i[P]];if(H==="string"){if(Ye==="gpu-buffer"||Ye==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let $e=[];for(let be=0;be<ke;be++){let Ae=u.getValue(F+be*l,"*"),ye=u.getValue(F+(be+1)*l,"*"),Zt=be===ke-1?void 0:ye-Ae;$e.push(u.UTF8ToString(Ae,Zt))}W.push([H,Ie,$e,"cpu"])}else if(Ye==="gpu-buffer"&&ke>0){let $e=u.jsepGetBuffer;if(!$e)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let be=$e(F),Ae=Ot(Se,ke);if(Ae===void 0||!ta(H))throw new Error(`Unsupported data type: ${H}`);U=!0,W.push([H,Ie,{gpuBuffer:be,download:u.jsepCreateDownloader(be,Ae,H),dispose:()=>{u._OrtReleaseTensor(se)!==0&&he("Can't release tensor.")}},"gpu-buffer"])}else if(Ye==="ml-tensor"&&ke>0){let $e=u.webnnEnsureTensor,be=u.webnnIsGraphInputOutputTypeSupported;if(!$e||!be)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Ot(Se,ke)===void 0||!ra(H))throw new Error(`Unsupported data type: ${H}`);if(!be(e,H,!1))throw new Error(`preferredLocation "ml-tensor" for ${H} output is not supported by current WebNN Context.`);let Ae=await $e(e,F,Se,Ie,!1);U=!0,W.push([H,Ie,{mlTensor:Ae,download:u.webnnCreateMLTensorDownloader(F,H),dispose:()=>{u.webnnReleaseTensorId(F),u._OrtReleaseTensor(se)}},"ml-tensor"])}else if(Ye==="ml-tensor-cpu-output"&&ke>0){let $e=u.webnnCreateMLTensorDownloader(F,H)(),be=W.length;U=!0,Y.push((async()=>{let Ae=[be,await $e];return u.webnnReleaseTensorId(F),u._OrtReleaseTensor(se),Ae})()),W.push([H,Ie,[],"cpu"])}else{let $e=ei(H),be=new $e(ke);new Uint8Array(be.buffer,be.byteOffset,be.byteLength).set(u.HEAPU8.subarray(F,F+be.byteLength)),W.push([H,Ie,be,"cpu"])}}finally{u.stackRestore(ne),H==="string"&&F&&u._free(F),U||u._OrtReleaseTensor(se)}}_&&!y&&(u._OrtClearBoundOutputs(_.handle)!==0&&he("Can't clear bound outputs."),yt.set(e,[c,m,g,_,y,!1]));for(let[P,se]of await Promise.all(Y))W[P][2]=se;return Rt("wasm ProcessOutputTensor"),W}finally{u.webnnOnRunEnd?.(c),u.stackRestore(N),E.forEach(O=>u._OrtReleaseTensor(O)),C.forEach(O=>u._OrtReleaseTensor(O)),z.forEach(O=>u._free(O)),T!==0&&u._OrtReleaseRunOptions(T),I.forEach(O=>u._free(O));for(let O of s){let W=It.get(O)-1;W===0?It.delete(O):It.set(O,W)}}},ba=e=>{let t=me(),r=yt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&he("Can't get an profile file name."),t._OrtFree(n)},va=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),it,qe,Vt,lr,dr,qr,In,Wr,Et,Ct,np,Uf,Pf,Lf,qf,Wf,Vf,Gf,Hf,Ff,xa=M(()=>{"use strict";Pe(),Mf(),Ut(),Yn(),ia(),it=()=>!!we.wasm.proxy&&typeof document<"u",Vt=!1,lr=!1,dr=!1,Wr=new Map,Et=(e,t)=>{let r=Wr.get(e);r?r.push(t):Wr.set(e,[t])},Ct=()=>{if(Vt||!lr||dr||!qe)throw new Error("worker not ready")},np=e=>{switch(e.data.type){case"init-wasm":Vt=!1,e.data.err?(dr=!0,In[1](e.data.err)):(lr=!0,In[0]()),qr&&(URL.revokeObjectURL(qr),qr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Wr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Uf=async()=>{if(!lr){if(Vt)throw new Error("multiple calls to 'initWasm()' detected.");if(dr)throw new Error("previous call to 'initWasm()' failed.");if(Vt=!0,it())return new Promise((e,t)=>{qe?.terminate(),Ap().then(([r,i])=>{try{qe=i,qe.onerror=a=>t(a),qe.onmessage=np,In=[e,t];let n={type:"init-wasm",in:we};!n.in.wasm.wasmPaths&&(r||zn)&&(n.in.wasm.wasmPaths={wasm:new URL("/pixcuro/assets/ort-wasm-simd-threaded.jsep-Dt5UNR3U.wasm",import.meta.url).href}),qe.postMessage(n),qr=r}catch(n){t(n)}},t)});try{await Jn(we.wasm),await ga(we),lr=!0}catch(e){throw dr=!0,e}finally{Vt=!1}}},Pf=async e=>{if(it())return Ct(),new Promise((t,r)=>{Et("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:we}};qe.postMessage(i)});await ya(we,e)},Lf=async e=>it()?(Ct(),new Promise((t,r)=>{Et("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};qe.postMessage(i,[e.buffer])})):Jr(e),qf=async(e,t)=>{if(it()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ct(),new Promise((r,i)=>{Et("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),qe.postMessage(n,a)})}else return _a(e,t)},Wf=async e=>{if(it())return Ct(),new Promise((t,r)=>{Et("release",[t,r]);let i={type:"release",in:e};qe.postMessage(i)});wa(e)},Vf=async e=>{if(it())throw new Error("LoRA adapter is not supported for proxy.");let t=typeof e=="string"?await ti(e):e;return Df(t)},Gf=async e=>{if(it())throw new Error("LoRA adapter is not supported for proxy.");Nf(e)},Hf=async(e,t,r,i,n,a,s)=>{if(it()){if(s.length>0)throw new Error("LoRA adapter is not supported for proxy.");if(r.some(u=>u[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(u=>u))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ct(),new Promise((u,l)=>{Et("run",[u,l]);let p=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:p,outputIndices:i,options:a}};qe.postMessage(c,va(p))})}else return $a(e,t,r,i,n,a,s)},Ff=async e=>{if(it())return Ct(),new Promise((t,r)=>{Et("end-profiling",[t,r]);let i={type:"end-profiling",in:e};qe.postMessage(i)});ba(e)}}),Sa,jf=M(()=>{"use strict";Pe(),xa(),Sa=class{async loadAdapter(e){We(),this.adapterId=await Vf(e),Me()}async dispose(){return Gf(this.adapterId)}}}),En,ap,Kf,Cy=M(()=>{"use strict";Pe(),jf(),xa(),ee(),Xn(),ia(),En=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ap=e=>{switch(e[3]){case"cpu":return new Xe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!ta(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return Xe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!ra(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return Xe.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},Kf=class{async fetchModelAndCopyToWasmMemory(e){return Lf(await ti(e))}async loadModel(e,t){We();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await qf(r,t),Me()}async dispose(){return Wf(this.sessionId)}async run(e,t,r,i=[]){We();let n=i.map(_=>{if(!(_ instanceof Sa))throw new Error("LoRA adapter was not created by the WebAssembly backend.");return _.adapterId}),a=[],s=[];Object.entries(e).forEach(_=>{let y=_[0],v=_[1],S=this.inputNames.indexOf(y);if(S===-1)throw new Error(`invalid input '${y}'`);a.push(v),s.push(S)});let u=[],l=[];Object.entries(t).forEach(_=>{let y=_[0],v=_[1],S=this.outputNames.indexOf(y);if(S===-1)throw new Error(`invalid output '${y}'`);u.push(v),l.push(S)});let p=a.map((_,y)=>En(_,()=>`input "${this.inputNames[s[y]]}"`)),c=u.map((_,y)=>_?En(_,()=>`output "${this.outputNames[l[y]]}"`):null),m=await Hf(this.sessionId,s,p,l,c,r,n),g={};for(let _=0;_<m.length;_++)g[this.outputNames[l[_]]]=u[_]??ap(m[_]);return Me(),g}startProfiling(){}endProfiling(){Ff(this.sessionId)}}}),Zf,zy=M(()=>{"use strict";Zf=e=>{if(e?.epContextDataRead)throw new Error('session option "epContextDataRead" is not supported by ONNX Runtime Web')}}),Qf={};Kt(Qf,{OnnxruntimeWebAssemblyBackend:()=>Gn,initializeFlags:()=>Vn,wasmBackend:()=>Xf});var Vn,Gn,Xf,Ay=M(()=>{"use strict";Pe(),jf(),xa(),Cy(),zy(),Vn=()=>{(typeof we.wasm.initTimeout!="number"||we.wasm.initTimeout<0)&&(we.wasm.initTimeout=0);let e=we.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),we.wasm.simd=!1),typeof we.wasm.proxy!="boolean"&&(we.wasm.proxy=!1),typeof we.wasm.trace!="boolean"&&(we.wasm.trace=!1),typeof we.wasm.numThreads!="number"||!Number.isInteger(we.wasm.numThreads)||we.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)we.wasm.numThreads=1;else{let t=typeof navigator>"u"?h0("node:os").cpus().length:navigator.hardwareConcurrency;we.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Gn=class{async init(e){Vn(),await Uf(),await Pf(e)}async createInferenceSessionHandler(e,t){Zf(t);let r=new Kf;return await r.loadModel(e,t),r}async createLoraAdapterHandler(e){let t=new Sa;return await t.loadAdapter(e),t}},Xf=new Gn});Pe();Pe();Pe();var Oy="1.31.1";{let e=(Ay(),mr(Qf)).wasmBackend;Gt("webgpu",e,5),Gt("webnn",e,5),Gt("cpu",e,10),Gt("wasm",e,10)}Object.defineProperty(we.versions,"web",{value:Oy,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const By="/pixcuro/u2net.onnx";let Cn=null,Vr=null;async function Ry(){return Cn||Vr||(Vr=(async()=>{const e=await Qn.create(By,{executionProviders:["wasm"]});return Cn=e,e})(),Vr)}function Dy(e,t,r){const i=document.createElement("canvas");i.width=t,i.height=r;const n=i.getContext("2d"),a=document.createElement("canvas");return a.width=e.width,a.height=e.height,a.getContext("2d").putImageData(e,0,0),n.imageSmoothingEnabled=!0,n.imageSmoothingQuality="high",n.drawImage(a,0,0,t,r),n.getImageData(0,0,t,r)}function Ny(e){const{width:t,height:r,data:i}=e,n=new Float32Array(1*3*r*t);for(let a=0;a<r;a++)for(let s=0;s<t;s++){const u=(a*t+s)*4,l=i[u]/255,p=i[u+1]/255,c=i[u+2]/255;n[0*r*t+a*t+s]=(l-.5)/.5,n[1*r*t+a*t+s]=(p-.5)/.5,n[2*r*t+a*t+s]=(c-.5)/.5}return n}function My(e){return 1/(1+Math.exp(-e))}function Uy(e,t,r){const a=new Float32Array(102400);let s=e[0],u=e[0];for(let v=1;v<e.length;v++)e[v]<s&&(s=e[v]),e[v]>u&&(u=e[v]);const l=u-s+1e-7;for(let v=0;v<e.length;v++){const S=My((e[v]-s)/l);a[v]=S>.5?Math.min(1,S*1.2):Math.max(0,S*.8)}const p=new Uint8ClampedArray(320*320);for(let v=0;v<a.length;v++)p[v]=Math.round(a[v]*255);const c=document.createElement("canvas");c.width=320,c.height=320;const m=c.getContext("2d"),g=m.createImageData(320,320);for(let v=0;v<p.length;v++)g.data[v*4]=p[v],g.data[v*4+1]=p[v],g.data[v*4+2]=p[v],g.data[v*4+3]=255;m.putImageData(g,0,0);const _=document.createElement("canvas");_.width=t,_.height=r;const y=_.getContext("2d");return y.imageSmoothingEnabled=!0,y.imageSmoothingQuality="high",y.drawImage(c,0,0,t,r),y.getImageData(0,0,t,r)}function Py(e,t){const{width:r,height:i,data:n}=e,a=new Uint8ClampedArray(n.length);for(let s=0;s<n.length;s+=4)a[s]=n[s],a[s+1]=n[s+1],a[s+2]=n[s+2],a[s+3]=t.data[s];return new ImageData(a,r,i)}async function Wy(e,t){t?.(.05);const r=await Ly(e);t?.(.1);const i=r.naturalWidth,n=r.naturalHeight,a=document.createElement("canvas");a.width=i,a.height=n;const s=a.getContext("2d");s.drawImage(r,0,0);const u=s.getImageData(0,0,i,n);t?.(.2);const l=Dy(u,320,320);t?.(.3);const p=Ny(l);t?.(.4);const c=await Ry();t?.(.6);const m=c.inputNames,_={[m.length>0?m[0]:"input1"]:new Xe(p,[1,3,320,320])},y=await c.run(_);t?.(.8);const v=c.outputNames,S=v.length>0?v[0]:"0",w=y[S].data;t?.(.85);const T=Uy(w,i,n);t?.(.9);const I=Py(u,T),E=document.createElement("canvas");E.width=i,E.height=n,E.getContext("2d").putImageData(I,0,0),t?.(.95);const z=await new Promise(N=>{E.toBlob(L=>N(L),"image/png")}),x=URL.createObjectURL(z);return{blob:z,url:x,width:i,height:n,size:z.size}}function Ly(e){return new Promise((t,r)=>{const i=new Image;i.onload=()=>t(i),i.onerror=()=>r(new Error("Could not load image file")),i.src=URL.createObjectURL(e)})}export{Wy as r};
