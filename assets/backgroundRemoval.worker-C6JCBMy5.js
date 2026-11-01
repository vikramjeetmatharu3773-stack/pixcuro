var Ry=Object.defineProperty;var Ny=(nt,at,Wt)=>at in nt?Ry(nt,at,{enumerable:!0,configurable:!0,writable:!0,value:Wt}):nt[at]=Wt;var Yh=(nt,at,Wt)=>Ny(nt,typeof at!="symbol"?at+"":at,Wt);(function(){"use strict";/*!
 * ONNX Runtime Web v1.31.1
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var nt=Object.defineProperty,at=Object.getOwnPropertyDescriptor,Wt=Object.getOwnPropertyNames,rm=Object.prototype.hasOwnProperty,im=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),M=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(i){throw r=[i],i}},Vt=(e,t)=>{for(var r in t)nt(e,r,{get:t[r],enumerable:!0})},nm=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Wt(t))!rm.call(e,n)&&n!==r&&nt(e,n,{get:()=>t[n],enumerable:!(i=at(t,n))||i.enumerable});return e},Yt=e=>nm(nt({},"__esModule",{value:!0}),e),Gt,st,ai,Ht,si,Ia,Ea,oi=M(()=>{"use strict";Gt=new Map,st=[],ai=new WeakMap,Ht=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=Gt.get(e);if(i===void 0)Gt.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=st.indexOf(e);n!==-1&&st.splice(n,1);for(let a=0;a<st.length;a++)if(Gt.get(st[a]).priority<=r){st.splice(a,0,e);return}st.push(e)}return}throw new TypeError("not a valid backend")},si=async e=>{let t=Gt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{if(!r){let i=t.backend,n=ai.get(i);t.initPromise=n?n.then(async()=>i.init(e),async()=>i.init(e)):i.init(e),ai.set(i,t.initPromise)}return await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Ia=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?st:r,n,a=[],o=new Set;for(let l of i){let p=await si(l);typeof p=="string"?a.push({name:l,err:p}):(n||(n=p),n===p&&o.add(l))}if(!n)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of a)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let u=t.filter(l=>o.has(typeof l=="string"?l:l.name));return[n,new Proxy(e,{get:(l,p)=>p==="executionProviders"?u:Reflect.get(l,p)})]},Ea=async()=>{let e=[];for(let r of st){if(typeof Gt.get(r).backend.createLoraAdapterHandler!="function")continue;let i=await si(r);if(typeof i!="string")return i;e.push({name:r,err:i})}let t=e.length===0?"":` ERR: ${e.map(r=>`[${r.name}] ${r.err}`).join(", ")}`;throw new Error(`no available backend supports LoRA adapters.${t}`)}}),am=M(()=>{"use strict";oi()}),Ca,sm=M(()=>{"use strict";Ca="1.31.1"}),ui,ze,za=M(()=>{"use strict";sm(),ui="warning",ze={wasm:{},webgl:{},webgpu:{},versions:{common:Ca},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ui=e}},get logLevel(){return ui}},Object.defineProperty(ze,"logLevel",{enumerable:!0})}),we,om=M(()=>{"use strict";za(),we=ze}),$r,li,Le,Ne,xt,St,di=M(()=>{"use strict";za(),$r=(e,t)=>{(typeof ze.trace>"u"?!ze.wasm.trace:!ze.trace)||console.timeStamp(`${e}::ORT::${t}`)},li=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(a+=`::${t}`),$r("CPU",a);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},Le=e=>{(typeof ze.trace>"u"?!ze.wasm.trace:!ze.trace)||li("BEGIN",e)},Ne=e=>{(typeof ze.trace>"u"?!ze.wasm.trace:!ze.trace)||li("END",e)},xt=e=>{(typeof ze.trace>"u"?!ze.wasm.trace:!ze.trace)||console.time(`ORT::${e}`)},St=e=>{(typeof ze.trace>"u"?!ze.wasm.trace:!ze.trace)||console.timeEnd(`ORT::${e}`)}}),pi,Aa=M(()=>{"use strict";oi(),di(),pi=class Jh{constructor(t,r){this.backend=t,this.handler=r}static async create(t){if(Le(),typeof t!="string"&&!(t instanceof Uint8Array))throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let r=await Ea(),i=await r.createLoraAdapterHandler(t);return Ne(),new Jh(r,i)}async release(){return this.handler.dispose()}}}),Oa,Ba,um=M(()=>{"use strict";Oa=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[3]):(n=e.dims[3],a=e.dims[2]);let o=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,p;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let f=a*n,m=0,g=f,_=f*2,y=-1;o==="RGBA"?(m=0,g=f,_=f*2,y=f*3):o==="RGB"?(m=0,g=f,_=f*2):o==="RBG"&&(m=0,_=f,g=f*2);for(let x=0;x<a;x++)for(let S=0;S<n;S++){let $=(e.data[m++]-p[0])*l[0],w=(e.data[g++]-p[1])*l[1],T=(e.data[_++]-p[2])*l[2],I=y===-1?255:(e.data[y++]-p[3])*l[3];i.fillStyle="rgba("+$+","+w+","+T+","+I+")",i.fillRect(S,x,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Ba=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,a,o;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[1],o=e.dims[3]):(n=e.dims[3],a=e.dims[2],o=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,f;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?f=[0,0,0,0]:typeof l.bias=="number"?f=[l.bias,l.bias,l.bias,l.bias]:(f=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(f[3]=l.bias[3]));let m=a*n;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!=="RGBA"||o===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,_=0,y=1,x=2,S=3,$=0,w=m,T=m*2,I=-1;u==="RGBA"?($=0,w=m,T=m*2,I=m*3):u==="RGB"?($=0,w=m,T=m*2):u==="RBG"&&($=0,T=m,w=m*2),i=r.createImageData(n,a);for(let E=0;E<a*n;_+=g,y+=g,x+=g,S+=g,E++)i.data[_]=(e.data[$++]-f[0])*p[0],i.data[y]=(e.data[w++]-f[1])*p[1],i.data[x]=(e.data[T++]-f[2])*p[2],i.data[S]=I===-1?255:(e.data[I++]-f[3])*p[3]}else throw new Error("Can not access image data");return i}}),br,Ra,Na,Da,Ma,Ua,lm=M(()=>{"use strict";fi(),br=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},a,o;typeof n.mean=="number"?a=[n.mean,n.mean,n.mean,n.mean]:a=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?o=[n.bias,n.bias,n.bias,n.bias]:o=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*i,f=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),m=4,g=0,_=1,y=2,x=3,S=0,$=p,w=p*2,T=-1;u==="RGB"&&(m=3,g=0,_=1,y=2,x=-1),l==="RGBA"?T=p*3:l==="RBG"?(S=0,w=p,$=p*2):l==="BGR"&&(w=0,$=p,S=p*2);for(let I=0;I<p;I++,g+=m,y+=m,_+=m,x+=m)f[S++]=(e[g]+o[0])/a[0],f[$++]=(e[_]+o[1])/a[1],f[w++]=(e[y]+o[2])/a[2],T!==-1&&x!==-1&&(f[T++]=(e[x]+o[3])/a[3]);return l==="RGBA"?new De("float32",f,[1,4,r,i]):new De("float32",f,[1,3,r,i])},Ra=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",o,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=l();f.width=e.width,f.height=e.height;let m=p(f);if(m!=null){let g=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=_}else u.tensorFormat="RGBA",u.height=g,u.width=_;m.drawImage(e,0,0),o=m.getImageData(0,0,_,g).data}else throw new Error("Can not access image data")}else if(i){let f,m;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,m=t.resizedWidth):(f=e.height,m=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=f,u.width=m,t!==void 0){let g=l();g.width=m,g.height=f;let _=p(g);if(_!=null)_.putImageData(e,0,0),o=_.getImageData(0,0,m,f).data;else throw new Error("Can not access image data")}else o=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=l();f.width=e.width,f.height=e.height;let m=p(f);if(m!=null){let g=e.height,_=e.width;return m.drawImage(e,0,0,_,g),o=m.getImageData(0,0,_,g).data,u.height=g,u.width=_,br(o,u)}else throw new Error("Can not access image data")}else{if(a)return new Promise((f,m)=>{let g=l(),_=p(g);if(!e||!_)return m();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{g.width=y.width,g.height=y.height,_.drawImage(y,0,0,g.width,g.height);let x=_.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,f(br(x.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(o!==void 0)return br(o,u);throw new Error("Input data provided is not supported - aborted tensor creation")},Na=(e,t)=>{let{width:r,height:i,download:n,dispose:a}=t,o=[1,i,r,4];return new De({location:"texture",type:"float32",texture:e,dims:o,download:n,dispose:a})},Da=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new De({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:a})},Ma=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new De({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:a})},Ua=(e,t,r)=>new De({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),kt,Jt,ci,Pa,dm=M(()=>{"use strict";kt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Jt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ci=!1,Pa=()=>{if(!ci){ci=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(kt.set("int64",BigInt64Array),Jt.set(BigInt64Array,"int64")),t&&(kt.set("uint64",BigUint64Array),Jt.set(BigUint64Array,"uint64")),i?(kt.set("float16",r),Jt.set(r,"float16")):kt.set("float16",Uint16Array)}}}),La,qa,pm=M(()=>{"use strict";fi(),La=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},qa=(e,t)=>{switch(e.location){case"cpu":return new De(e.type,e.data,t);case"cpu-pinned":return new De({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new De({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new De({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new De({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),De,fi=M(()=>{"use strict";um(),lm(),dm(),pm(),De=class{constructor(e,t,r){Pa();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let o=kt.get(i);if(!o)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");o=t}else{let l=kt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?o=l.from(t,BigInt):o=l.from(t)}else if(t instanceof l)o=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")o=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",o=e;else if(l==="boolean")i="bool",o=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",o=Uint8Array.from(e);else{let l=Jt.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,o=e}if(u===void 0)u=[o.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");n=u,this.cpuData=o,this.dataLocation="cpu"}let a=La(n);if(this.cpuData&&a!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=a}static async fromImage(e,t){return Ra(e,t)}static fromTexture(e,t){return Na(e,t)}static fromGpuBuffer(e,t){return Da(e,t)}static fromMLTensor(e,t){return Ma(e,t)}static fromPinnedBuffer(e,t,r){return Ua(e,t,r)}toDataURL(e){return Oa(this,e)}toImageData(e){return Ba(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return qa(this,e)}}}),Ve,Wa=M(()=>{"use strict";fi(),Ve=De}),Va,cm=M(()=>{"use strict";oi(),Aa(),Wa(),di(),Va=class em{constructor(t,r){this.handler=t,this.backend=r}async run(t,r,i){Le(),xt("InferenceSession.run");let n={},a={};if(typeof t!="object"||t===null||t instanceof Ve||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ve)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");o=!1;for(let f of r){if(typeof f!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(f)===-1)throw new RangeError(`'fetches' contains invalid output name: ${f}.`);n[f]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let f=!1,m=Object.getOwnPropertyNames(r);for(let g of this.outputNames)if(m.indexOf(g)!==-1){let _=r[g];(_===null||_ instanceof Ve)&&(f=!0,o=!1,n[g]=_)}if(f){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let f of this.inputNames)if(typeof t[f]>"u")throw new Error(`input '${f}' is missing in 'feeds'.`);if(o)for(let f of this.outputNames)n[f]=null;let u;if(a.activeLoraAdapters!==void 0){if(!Array.isArray(a.activeLoraAdapters))throw new TypeError("'activeLoraAdapters' must be an array.");u=a.activeLoraAdapters.map(f=>{if(!(f instanceof pi))throw new TypeError("'activeLoraAdapters' must be an array of LoraAdapter objects.");if(f.backend!==this.backend)throw new Error("LoRA adapter was created by a different backend than the session.");return f.handler})}let l=await this.handler.run(t,n,a,u),p={};for(let f in l)if(Object.hasOwnProperty.call(l,f)){let m=l[f];m instanceof Ve?p[f]=m:p[f]=new Ve(m.type,m.data,m.dims)}return St("InferenceSession.run"),Ne(),p}async release(){return this.handler.dispose()}static async create(t,r,i,n){Le(),xt("InferenceSession.create");let a,o={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,m=0,g=t.byteLength;if(typeof r=="object"&&r!==null)o=r;else if(typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteOffset' must be an integer.");if(m<0||m>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(g=t.byteLength-m,typeof i=="number"){if(g=i,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||m+g>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-m}].`);if(typeof n=="object"&&n!==null)o=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(f,m,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await Ia(o),p=await u.createInferenceSessionHandler(a,l);return St("InferenceSession.create"),Ne(),new em(p,u)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),hi,fm=M(()=>{"use strict";cm(),hi=Va}),Ga,hm=M(()=>{"use strict";Aa(),Ga=pi}),mm=M(()=>{"use strict"}),gm=M(()=>{"use strict"}),ym=M(()=>{"use strict"}),_m=M(()=>{"use strict"}),wm={};Vt(wm,{InferenceSession:()=>hi,LoraAdapter:()=>Ga,TRACE:()=>$r,TRACE_EVENT_BEGIN:()=>xt,TRACE_EVENT_END:()=>St,TRACE_FUNC_BEGIN:()=>Le,TRACE_FUNC_END:()=>Ne,Tensor:()=>Ve,env:()=>we,registerBackend:()=>Ht});var Me=M(()=>{"use strict";am(),om(),fm(),hm(),Wa(),mm(),gm(),di(),ym(),_m()}),mi=M(()=>{"use strict"}),Ha={};Vt(Ha,{default:()=>Fa});var gi,yi,Fa,$m=M(()=>{"use strict";Mc(),Tt(),xi(),gi="ort-wasm-proxy-worker",yi=globalThis.self?.name===gi,yi&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Ti(r.wasm).then(()=>{Wn(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:n}=r;Vn(n,i).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:i}=r,n=Wr(i);postMessage({type:t,out:n});break}case"create":{let{model:i,options:n}=r;Hn(i,n).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":Fn(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:n,inputs:a,outputIndices:o,options:u}=r;Kn(i,n,a,o,new Array(o.length).fill(null),u).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},Qn([...a,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":Zn(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),Fa=yi?null:e=>new Worker(e??Ue,{type:"module",name:gi})}),ja={};Vt(ja,{default:()=>Za});async function Ka(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,n=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(s,d)=>{s.startsWith("./")&&(s=s.substring(2)),(t.jd||(t.jd=new Map)).set(s,d)},t.unmountExternalData=()=>{delete t.jd,delete t.ke,delete t.je,delete t.le},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=s=>async(...d)=>{try{if(t.hd)throw Error("Session already started");let h=t.hd={Vd:d[0],errors:[]},c=await s(...d);if(t.hd!==h)throw Error("Session mismatch");t.pd?.flush();let b=h.errors;if(0<b.length){let k=await Promise.all(b);if(k=k.filter(z=>z),0<k.length)throw Error(k.join(`
`))}return c}finally{t.hd=null}};t.jsepInit=(s,d)=>{if(s==="webgpu"){[t.pd,t.Ld,t.Pd,t.rd,t.Od,t.ic,t.Qd,t.Sd,t.Md,t.Nd,t.Rd]=d;let h=t.pd;t.jsepRegisterBuffer=(c,b,k,z)=>h.registerBuffer(c,b,k,z),t.jsepGetBuffer=c=>h.getBuffer(c),t.jsepCreateDownloader=(c,b,k)=>h.createDownloader(c,b,k),t.jsepOnCreateSession=c=>{h.onCreateSession(c)},t.jsepOnReleaseSession=c=>{h.onReleaseSession(c)},t.jsepOnRunStart=c=>h.onRunStart(c),t.Td=(c,b)=>{h.upload(c,b)}}else if(s==="webnn"){let h=d[0];[t.ce,t.Cd,t.webnnEnsureTensor,t.Dd,t.webnnDownloadTensor,t.be,t.webnnEnableTraceEvent]=d.slice(1),t.webnnReleaseTensorId=t.Cd,t.webnnUploadTensor=t.Dd,t.webnnRegisterMLContext=t.be,t.webnnOnRunStart=c=>h.onRunStart(c),t.webnnOnRunEnd=h.onRunEnd.bind(h),t.webnnOnReleaseSession=c=>{h.onReleaseSession(c)},t.webnnCreateMLTensorDownloader=(c,b)=>h.createMLTensorDownloader(c,b),t.webnnRegisterMLTensor=(c,b,k,z)=>h.registerMLTensor(c,b,k,z),t.webnnCreateMLContext=c=>h.createMLContext(c),t.webnnRegisterGraphInput=h.registerGraphInput.bind(h),t.webnnIsGraphInput=h.isGraphInput.bind(h),t.webnnRegisterGraphOutput=h.registerGraphOutput.bind(h),t.webnnIsGraphOutput=h.isGraphOutput.bind(h),t.webnnCreateTemporaryTensor=h.createTemporaryTensor.bind(h),t.webnnIsGraphInputOutputTypeSupported=h.isGraphInputOutputTypeSupported.bind(h)}};let o=()=>{let s=d=>(...h)=>{let c=rt;return h=d(...h),rt!=c?new Promise((b,k)=>{ha={resolve:b,reject:k}}):h};(d=>{for(let h of d)t[h]=s(t[h])})("_OrtAppendExecutionProvider _OrtAppendExecutionProviderV2 _OrtCreateSession _OrtRun _OrtRunWithBinding _OrtBindInput".split(" ")),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),o=void 0};t.asyncInit=()=>{o?.()};var u,l,p=(s,d)=>{throw d},f=self.location.href,m="";if(r||i){try{m=new URL(".",f).href}catch{}i&&(l=s=>{var d=new XMLHttpRequest;return d.open("GET",s,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),u=async s=>{if(A(s))return new Promise((h,c)=>{var b=new XMLHttpRequest;b.open("GET",s,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?h(b.response):c(b.status)},b.onerror=c,b.send(null)});var d=await fetch(s,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var g,_,y,x,S,$,w=console.log.bind(console),T=console.error.bind(console),I=w,E=T,C=!1,A=s=>s.startsWith("file://");function v(){_t.buffer!=L.buffer&&H()}if(n){let s=function(d){try{var h=d.data,c=h.bd;if(c==="load"){let b=[];self.onmessage=k=>b.push(k),$=()=>{postMessage({bd:"loaded"});for(let k of b)s(k);self.onmessage=s};for(let k of h.Hd)t[k]&&!t[k].proxy||(t[k]=(...z)=>{postMessage({bd:"callHandler",Fd:k,args:z})},k=="print"&&(I=t[k]),k=="printErr"&&(E=t[k]));_t=h.Zd,H(),_=h.$d,Qe(),ii()}else if(c==="run"){(function(b){var k=(v(),W)[b+52>>>2>>>0];b=(v(),W)[b+56>>>2>>>0],sh(k,k-b),oe(k)})(h.ad),wa(h.ad,0,0,1,0,0),sf(),pa(h.ad),D||(eh(),D=!0);try{Sg(h.Xd,h.nd)}catch(b){if(b!="unwind")throw b}}else h.target!=="setimmediate"&&(c==="checkMailbox"?D&&Qr():c&&(E(`worker: received unknown command ${c}`),E(h)))}catch(b){throw th(),b}};var D=!1;self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=s}var L,X,Q,J,O,W,Y,P,se,ne,te,U=!1;function H(){var s=_t.buffer;t.HEAP8=L=new Int8Array(s),Q=new Int16Array(s),t.HEAPU8=X=new Uint8Array(s),J=new Uint16Array(s),t.HEAP32=O=new Int32Array(s),t.HEAPU32=W=new Uint32Array(s),Y=new Float32Array(s),P=new Float64Array(s),se=new BigInt64Array(s),ne=new BigUint64Array(s)}function F(){U=!0,n?$():ct.vb()}function V(s){throw E(s="Aborted("+s+")"),C=!0,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),S?.(s),s}function Se(){return{a:{na:j0,jb:F0,g:kg,G:Tg,f:Ig,o:Eg,h:Cg,$:zg,b:Ag,S:Og,Ja:cf,n:Bg,aa:gf,_a:yf,Fa:_f,Ha:wf,$a:$f,Ya:bf,Ra:vf,Xa:xf,la:Sf,Ga:kf,Da:Tf,Za:If,Ea:Ef,eb:Rg,ga:Ng,ya:Dg,wa:Ug,fa:Lg,N:qg,I:Wg,xa:Vg,_:Qg,za:Xg,Ua:Yg,Ba:e0,Ka:t0,ua:r0,ha:i0,Ta:pa,bb:n0,Q:u0,r:f0,c:la,kb:h0,y:m0,M:g0,D:y0,m:_0,s:Df,lb:w0,J:$0,R:b0,j:v0,u:x0,q:S0,k:k0,Oa:T0,Pa:I0,Qa:E0,Ma:Lf,Na:qf,va:Wf,gb:z0,db:O0,v:B0,ba:R0,ia:N0,cb:A0,V:D0,ab:M0,Ca:U0,F:C0,U:P0,ma:ti,Aa:q0,ib:L0,hb:W0,Va:Ff,Wa:jf,Ia:na,T:Kf,La:Zf,ka:Qf,Sa:Xf,ja:Yf,nb:Ay,oa:Ty,ob:zy,pa:ky,H:hy,e:X0,t:Z0,w:K0,B:uy,pb:vy,Z:by,x:ty,qa:xy,X:Iy,ca:$y,qb:wy,ea:J0,O:ly,sb:gy,ra:_y,tb:my,L:cy,Y:Sy,d:Q0,A:ey,l:Y0,mb:Oy,p:iy,z:ny,C:ry,E:ay,K:dy,sa:fy,P:Ey,da:py,W:Cy,ub:oy,ta:sy,rb:yy,i:G0,a:_t,fb:mr}}}async function Qe(){function s(c,b){var k=ct=c.exports;c={};for(let[z,R]of Object.entries(k))typeof R=="function"?(k=a0(R),c[z]=k):c[z]=R;return ct=c,ct=function(){var z=ct,R=G=>ae=>G(ae)>>>0,q=G=>()=>G()>>>0;return(z=Object.assign({},z)).wb=R(z.wb),z.ec=q(z.ec),z.gc=R(z.gc),z.uc=R(z.uc),z.vc=q(z.vc),z.zc=R(z.zc),z}(),nf.push(ct.hc),Jf=(c=ct).wb,eh=c.xb,t._OrtInit=c.yb,t._OrtGetLastError=c.zb,t._OrtCreateSessionOptions=c.Ab,t._OrtAppendExecutionProvider=c.Bb,t._OrtGetEpDevices=c.Cb,t._OrtEpDevice_EpName=c.Db,t._OrtAppendExecutionProviderV2=c.Eb,t._OrtAddFreeDimensionOverride=c.Fb,t._OrtAddSessionConfigEntry=c.Gb,t._OrtReleaseSessionOptions=c.Hb,t._OrtCreateSession=c.Ib,t._OrtReleaseSession=c.Jb,t._OrtGetInputOutputCount=c.Kb,t._OrtGetInputOutputMetadata=c.Lb,t._OrtFree=c.Mb,t._OrtCreateTensor=c.Nb,t._OrtGetTensorData=c.Ob,t._OrtReleaseTensor=c.Pb,t._OrtCreateLoraAdapter=c.Qb,t._OrtReleaseLoraAdapter=c.Rb,t._OrtCreateRunOptions=c.Sb,t._OrtAddRunConfigEntry=c.Tb,t._OrtRunOptionsAddActiveLoraAdapter=c.Ub,t._OrtReleaseRunOptions=c.Vb,t._OrtCreateBinding=c.Wb,t._OrtBindInput=c.Xb,t._OrtBindOutput=c.Yb,t._OrtClearBoundOutputs=c.Zb,t._OrtReleaseBinding=c._b,t._OrtRunWithBinding=c.$b,t._OrtRun=c.ac,t._OrtEndProfiling=c.bc,t._JsepOutput=c.cc,t._JsepGetNodeName=c.dc,ri=c.ec,it=t._free=c.fc,_r=t._malloc=c.gc,wa=c.jc,th=c.kc,rh=c.lc,ih=c.mc,$a=c.nc,nh=c.oc,ah=c.pc,le=c.qc,wr=c.rc,sh=c.sc,oe=c.tc,ba=c.uc,ue=c.vc,oh=c.wc,va=c.xc,uh=c.yc,lh=c.zc,dh=c.Ac,xa=c.Bc,ph=c.Cc,ch=c.Dc,fh=c.Ec,hh=c.Fc,mh=c.Gc,gh=c.Hc,yh=c.Ic,_h=c.Jc,wh=c.Kc,$h=c.Lc,bh=c.Mc,vh=c.Nc,xh=c.Oc,Sh=c.Pc,kh=c.Qc,Th=c.Rc,Ih=c.Sc,Eh=c.Tc,Ch=c.Uc,zh=c.Vc,Ah=c.Wc,Oh=c.Xc,Bh=c.Yc,Rh=c._c,Nh=c.$c,Dh=c.kd,Mh=c.ld,Uh=c.qd,Ph=c.vd,Lh=c.wd,qh=c.xd,Wh=c.yd,Vh=c.zd,Gh=c.Ad,Hh=c.Bd,Fh=c.Gd,jh=c.Jd,Kh=c.fe,Zh=c.ge,Qh=c.he,Xh=c.ie,_=b,ct}var d,h=Se();return t.instantiateWasm?new Promise(c=>{t.instantiateWasm(h,(b,k)=>{c(s(b,k))})}):n?s(new WebAssembly.Instance(_,Se()),_):(te??(te=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",m):m+"ort-wasm-simd-threaded.jsep.wasm":new URL("/pixcuro/assets/ort-wasm-simd-threaded.jsep-Dt5UNR3U.wasm",self.location.href).href),d=await async function(c){var b=te;if(!g&&!A(b))try{var k=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(k,c)}catch(z){E(`wasm streaming compile failed: ${z}`),E("falling back to ArrayBuffer instantiation")}return async function(z,R){try{var q=await async function(G){if(!g)try{var ae=await u(G);return new Uint8Array(ae)}catch{}if(G==te&&g)G=new Uint8Array(g);else{if(!l)throw"both async and sync fetching of the wasm failed";G=l(G)}return G}(z);return await WebAssembly.instantiate(q,R)}catch(G){E(`failed to asynchronously prepare wasm: ${G}`),V(G)}}(b,c)}(h),s(d.instance,d.module))}class Oe{constructor(d){Yh(this,"name","ExitStatus");this.message=`Program terminated with exit(${d})`,this.status=d}}var Ie=s=>{s.terminate(),s.onmessage=()=>{}},ke=[],et=0,ve=null,xe=s=>{yt.length==0&&(uf(),of(yt[0]));var d=yt.pop();if(!d)return 6;gr.push(d),Pt[s.ad]=d,d.ad=s.ad;var h={bd:"run",Xd:s.Wd,nd:s.nd,ad:s.ad};return d.postMessage(h,s.ud),0},Be=0,ye=(s,d,...h)=>{var c,b=16*h.length,k=ue(),z=ba(b),R=z>>>3;for(c of h)typeof c=="bigint"?((v(),se)[R++>>>0]=1n,(v(),se)[R++>>>0]=c):((v(),se)[R++>>>0]=0n,(v(),P)[R++>>>0]=c);return s=rh(s,0,b,z,d),oe(k),s};function mr(s){if(n)return ye(0,1,s);if(y=s,!(0<Be)){for(var d of gr)Ie(d);for(d of yt)Ie(d);yt=[],gr=[],Pt={},C=!0}p(0,new Oe(s))}function rf(s){if(n)return ye(1,0,s);na(s)}var na=s=>{if(y=s,n)throw rf(s),"unwind";mr(s)},yt=[],gr=[],nf=[],Pt={},af=s=>{var d=s.ad;delete Pt[d],yt.push(s),gr.splice(gr.indexOf(s),1),s.ad=0,ih(d)};function sf(){nf.forEach(s=>s())}var of=s=>new Promise(d=>{s.onmessage=b=>{var k=b.data;if(b=k.bd,k.md&&k.md!=ri()){var z=Pt[k.md];z?z.postMessage(k,k.ud):E(`Internal error! Worker sent a message "${b}" to target pthread ${k.md}, but that thread no longer exists!`)}else b==="checkMailbox"?Qr():b==="spawnThread"?xe(k):b==="cleanupThread"?Zr(()=>{af(Pt[k.Yd])}):b==="loaded"?(s.loaded=!0,d(s)):k.target==="setimmediate"?s.postMessage(k):b==="uncaughtException"?s.onerror(k.error):b==="callHandler"?t[k.Fd](...k.args):b&&E(`worker sent an unknown command ${b}`)},s.onerror=b=>{throw E(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b};var h,c=[];for(h of[])t.propertyIsEnumerable(h)&&c.push(h);s.postMessage({bd:"load",Hd:c,Zd:_t,$d:_})});function uf(){var s=new Worker((()=>{let d=URL;return self.location.href>"file:"&&self.location.href<"file;"?new d("ort.bundle.min.mjs",self.location.href):new URL(self.location.href)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});yt.push(s)}var _t,Sg=(s,d)=>{Be=0,s=xa(s,d),0<Be?y=s:$a(s)},Fr=[],jr=0;function kg(s){var d=new aa(s>>>=0);return(v(),L)[d.cd+12>>>0]==0&&(lf(d,!0),jr--),df(d,!1),Fr.push(d),lh(s)}var Qt=0,Tg=()=>{le(0,0);var s=Fr.pop();oh(s.od),Qt=0};function lf(s,d){d=d?1:0,(v(),L)[s.cd+12>>>0]=d}function df(s,d){d=d?1:0,(v(),L)[s.cd+13>>>0]=d}class aa{constructor(d){this.od=d,this.cd=d-24}}var sa=s=>{var d=Qt;if(!d)return wr(0),0;var h=new aa(d);(v(),W)[h.cd+16>>>2>>>0]=d;var c=(v(),W)[h.cd+4>>>2>>>0];if(!c)return wr(0),d;for(var b of s){if(b===0||b===c)break;if(uh(b,c,h.cd+16))return wr(b),d}return wr(c),d};function Ig(){return sa([])}function Eg(s){return sa([s>>>0])}function Cg(s,d,h,c){return sa([s>>>0,d>>>0,h>>>0,c>>>0])}var zg=()=>{var s=Fr.pop();s||V("no exception to throw");var d=s.od;throw(v(),L)[s.cd+13>>>0]==0&&(Fr.push(s),df(s,!0),lf(s,!1),jr++),va(d),Qt=d};function Ag(s,d,h){var c=new aa(s>>>=0);throw d>>>=0,h>>>=0,(v(),W)[c.cd+16>>>2>>>0]=0,(v(),W)[c.cd+4>>>2>>>0]=d,(v(),W)[c.cd+8>>>2>>>0]=h,va(s),jr++,Qt=s}var Og=()=>jr;function pf(s,d,h,c){return n?ye(2,1,s,d,h,c):cf(s,d,h,c)}function cf(s,d,h,c){if(s>>>=0,d>>>=0,h>>>=0,c>>>=0,!globalThis.SharedArrayBuffer)return 6;var b=[];return n&&b.length===0?pf(s,d,h,c):(s={Wd:h,ad:s,nd:c,ud:b},n?(s.bd="spawnThread",postMessage(s,b),0):xe(s))}function Bg(s){throw Qt||(Qt=s>>>0),Qt}var ff=globalThis.TextDecoder&&new TextDecoder,hf=(s,d,h,c)=>{if(h=d+h,c)return h;for(;s[d]&&!(d>=h);)++d;return d},mf=(s,d=0,h,c)=>{if(16<(h=hf(s,d>>>=0,h,c))-d&&s.buffer&&ff)return ff.decode(s.buffer instanceof ArrayBuffer?s.subarray(d,h):s.slice(d,h));for(c="";d<h;){var b=s[d++];if(128&b){var k=63&s[d++];if((224&b)==192)c+=String.fromCharCode((31&b)<<6|k);else{var z=63&s[d++];65536>(b=(240&b)==224?(15&b)<<12|k<<6|z:(7&b)<<18|k<<12|z<<6|63&s[d++])?c+=String.fromCharCode(b):(b-=65536,c+=String.fromCharCode(55296|b>>10,56320|1023&b))}}else c+=String.fromCharCode(b)}return c},Te=(s,d,h)=>(s>>>=0)?mf((v(),X),s,d,h):"";function gf(s,d,h){return n?ye(3,1,s,d,h):0}function yf(s,d){if(n)return ye(4,1,s,d)}function _f(s,d){if(n)return ye(5,1,s,d)}function wf(s,d,h){if(n)return ye(6,1,s,d,h)}function $f(s,d,h){return n?ye(7,1,s,d,h):0}function bf(s,d){if(n)return ye(8,1,s,d)}function vf(s,d,h){if(n)return ye(9,1,s,d,h)}function xf(s,d,h,c){if(n)return ye(10,1,s,d,h,c)}function Sf(s,d,h,c){if(n)return ye(11,1,s,d,h,c)}function kf(s,d,h,c){if(n)return ye(12,1,s,d,h,c)}function Tf(s){if(n)return ye(13,1,s)}function If(s,d){if(n)return ye(14,1,s,d)}function Ef(s,d,h){if(n)return ye(15,1,s,d,h)}var Rg=()=>V(""),tt=s=>{s>>>=0;for(var d="";;){var h=(v(),X)[s++>>>0];if(!h)return d;d+=String.fromCharCode(h)}},oa={},ua={},Xt=class extends Error{constructor(s){super(s),this.name="BindingError"}};function pt(s,d,h={}){return function(c,b,k={}){var z=b.name;if(!c)throw new Xt(`type "${z}" must have a positive integer typeid pointer`);if(ua.hasOwnProperty(c)){if(k.Id)return;throw new Xt(`Cannot register type '${z}' twice`)}ua[c]=b,oa.hasOwnProperty(c)&&(b=oa[c],delete oa[c],b.forEach(R=>R()))}(s,d,h)}var Cf=(s,d,h)=>{switch(d){case 1:return h?c=>(v(),L)[c>>>0]:c=>(v(),X)[c>>>0];case 2:return h?c=>(v(),Q)[c>>>1>>>0]:c=>(v(),J)[c>>>1>>>0];case 4:return h?c=>(v(),O)[c>>>2>>>0]:c=>(v(),W)[c>>>2>>>0];case 8:return h?c=>(v(),se)[c>>>3>>>0]:c=>(v(),ne)[c>>>3>>>0];default:throw new TypeError(`invalid integer width (${d}): ${s}`)}};function Ng(s,d,h,c,b){s>>>=0,h>>>=0,d=tt(d>>>0);let k=z=>z;if(c=c===0n){let z=8*h;k=R=>BigInt.asUintN(z,R),b=k(b)}pt(s,{name:d,Zc:k,ed:(z,R)=>(typeof R=="number"&&(R=BigInt(R)),R),dd:Cf(d,h,!c),gd:null})}function Dg(s,d,h,c){pt(s>>>=0,{name:d=tt(d>>>0),Zc:function(b){return!!b},ed:function(b,k){return k?h:c},dd:function(b){return this.Zc((v(),X)[b>>>0])},gd:null})}var zf=[],Lt=[0,1,,1,null,1,!0,1,!1,1];function la(s){9<(s>>>=0)&&--Lt[s+1]===0&&(Lt[s]=void 0,zf.push(s))}var We=s=>{if(!s)throw new Xt(`Cannot use deleted val. handle = ${s}`);return Lt[s]},Xe=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=zf.pop()||Lt.length;return Lt[d]=s,Lt[d+1]=1,d}};function da(s){return this.Zc((v(),W)[s>>>2>>>0])}var Mg={name:"emscripten::val",Zc:s=>{var d=We(s);return la(s),d},ed:(s,d)=>Xe(d),dd:da,gd:null};function Ug(s){return pt(s>>>0,Mg)}var Pg=(s,d)=>{switch(d){case 4:return function(h){return this.Zc((v(),Y)[h>>>2>>>0])};case 8:return function(h){return this.Zc((v(),P)[h>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${s}`)}};function Lg(s,d,h){h>>>=0,pt(s>>>=0,{name:d=tt(d>>>0),Zc:c=>c,ed:(c,b)=>b,dd:Pg(d,h),gd:null})}function qg(s,d,h,c,b){s>>>=0,h>>>=0,d=tt(d>>>0);let k=R=>R;if(c===0){var z=32-8*h;k=R=>R<<z>>>z,b=k(b)}pt(s,{name:d,Zc:k,ed:(R,q)=>q,dd:Cf(d,h,c!==0),gd:null})}function Wg(s,d,h){function c(k){var z=(v(),W)[k>>>2>>>0];return k=(v(),W)[k+4>>>2>>>0],new b((v(),L).buffer,k,z)}var b=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];pt(s>>>=0,{name:h=tt(h>>>0),Zc:c,dd:c},{Id:!0})}var wt=(s,d,h)=>{var c=(v(),X);if(d>>>=0,0<h){var b=d;h=d+h-1;for(var k=0;k<s.length;++k){var z=s.codePointAt(k);if(127>=z){if(d>=h)break;c[d++>>>0]=z}else if(2047>=z){if(d+1>=h)break;c[d++>>>0]=192|z>>6,c[d++>>>0]=128|63&z}else if(65535>=z){if(d+2>=h)break;c[d++>>>0]=224|z>>12,c[d++>>>0]=128|z>>6&63,c[d++>>>0]=128|63&z}else{if(d+3>=h)break;c[d++>>>0]=240|z>>18,c[d++>>>0]=128|z>>12&63,c[d++>>>0]=128|z>>6&63,c[d++>>>0]=128|63&z,k++}}c[d>>>0]=0,s=d-b}else s=0;return s},Kr=s=>{for(var d=0,h=0;h<s.length;++h){var c=s.charCodeAt(h);127>=c?d++:2047>=c?d+=2:55296<=c&&57343>=c?(d+=4,++h):d+=3}return d};function Vg(s,d){pt(s>>>=0,{name:d=tt(d>>>0),Zc(h){var c=(v(),W)[h>>>2>>>0];return c=Te(h+4,c,!0),it(h),c},ed(h,c){c instanceof ArrayBuffer&&(c=new Uint8Array(c));var b=typeof c=="string";if(!(b||ArrayBuffer.isView(c)&&c.BYTES_PER_ELEMENT==1))throw new Xt("Cannot pass non-string to std::string");var k=b?Kr(c):c.length,z=_r(4+k+1),R=z+4;return(v(),W)[z>>>2>>>0]=k,b?wt(c,R,k+1):(v(),X).set(c,R>>>0),h!==null&&h.push(it,z),z},dd:da,gd(h){it(h)}})}var Af=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,Gg=(s,d,h)=>{if(s>>>=1,16<(d=hf((v(),J),s,d/2,h))-s&&Af)return Af.decode((v(),J).slice(s,d));for(h="";s<d;++s){var c=(v(),J)[s>>>0];h+=String.fromCharCode(c)}return h},Hg=(s,d,h)=>{if(h??(h=2147483647),2>h)return 0;var c=d;h=(h-=2)<2*s.length?h/2:s.length;for(var b=0;b<h;++b){var k=s.charCodeAt(b);(v(),Q)[d>>>1>>>0]=k,d+=2}return(v(),Q)[d>>>1>>>0]=0,d-c},Fg=s=>2*s.length,jg=(s,d,h)=>{var c="";s>>>=2;for(var b=0;!(b>=d/4);b++){var k=(v(),W)[s+b>>>0];if(!k&&!h)break;c+=String.fromCodePoint(k)}return c},Kg=(s,d,h)=>{if(d>>>=0,h??(h=2147483647),4>h)return 0;var c=d;h=c+h-4;for(var b=0;b<s.length;++b){var k=s.codePointAt(b);if(65535<k&&b++,(v(),O)[d>>>2>>>0]=k,(d+=4)+4>h)break}return(v(),O)[d>>>2>>>0]=0,d-c},Zg=s=>{for(var d=0,h=0;h<s.length;++h)65535<s.codePointAt(h)&&h++,d+=4;return d};function Qg(s,d,h){if(s>>>=0,d>>>=0,h=tt(h>>>=0),d===2)var c=Gg,b=Hg,k=Fg;else c=jg,b=Kg,k=Zg;pt(s,{name:h,Zc:z=>{var R=(v(),W)[z>>>2>>>0];return R=c(z+4,R*d,!0),it(z),R},ed:(z,R)=>{if(typeof R!="string")throw new Xt(`Cannot pass non-string to C++ string type ${h}`);var q=k(R),G=_r(4+q+d);return(v(),W)[G>>>2>>>0]=q/d,b(R,G+4,q+d),z!==null&&z.push(it,G),G},dd:da,gd(z){it(z)}})}function Xg(s,d){pt(s>>>=0,{Kd:!0,name:d=tt(d>>>0),Zc:()=>{},ed:()=>{}})}function Yg(s){wa(s>>>0,!i,1,!r,131072,!1),sf()}var Zr=s=>{if(!C)try{if(s(),!(0<Be))try{n?ri()&&$a(y):na(y)}catch(d){d instanceof Oe||d=="unwind"||p(0,d)}}catch(d){d instanceof Oe||d=="unwind"||p(0,d)}},Jg=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function pa(s){s>>>=0,Jg||(Atomics.waitAsync((v(),O),s>>>2,s).value.then(Qr),s+=128,Atomics.store((v(),O),s>>>2,1))}var Qr=()=>Zr(()=>{var s=ri();s&&(pa(s),ah())});function e0(s,d){(s>>>=0)==d>>>0?setTimeout(Qr):n?postMessage({md:s,bd:"checkMailbox"}):(s=Pt[s])&&s.postMessage({bd:"checkMailbox"})}var ca=[];function t0(s,d,h,c,b){for(d>>>=0,b>>>=0,ca.length=0,h=b>>>3,c=b+c>>>3;h<c;){var k;k=(v(),se)[h++>>>0]?(v(),se)[h++>>>0]:(v(),P)[h++>>>0],ca.push(k)}return(d?Sa[d]:H0[s])(...ca)}var r0=()=>{Be=0};function i0(s){s>>>=0,n?postMessage({bd:"cleanupThread",Yd:s}):af(Pt[s])}function n0(s){}var Xr=s=>{try{s()}catch(d){V(d)}};function a0(s){var d=(...h)=>{Yr.push(s);try{return s(...h)}finally{C||(Yr.pop(),rt&&$t===1&&Yr.length===0&&($t=0,Be+=1,Xr(Zh),typeof Fibers<"u"&&Fibers.ne()))}};return Rf.set(s,d),d}var $t=0,rt=null,Of=0,Yr=[],fa=new Map,Bf=new Map,Rf=new Map,s0=0,ha=null,o0=[],Nf=s=>function(d){if(!C){if($t===0){var h=!1,c=!1;d((b=0)=>{if(!C&&(Of=b,h=!0,c)){$t=2,Xr(()=>Qh(rt)),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.resume(),b=!1;try{var k=function(){var q=(v(),O)[rt+8>>>2>>>0];return q=Bf.get(q),q=Rf.get(q),--Be,q()}()}catch(q){k=q,b=!0}var z=!1;if(!rt){var R=ha;R&&(ha=null,(b?R.reject:R.resolve)(k),z=!0)}if(b&&!z)throw k}}),c=!0,h||($t=1,rt=function(){var b=_r(65548),k=b+12;if((v(),W)[b>>>2>>>0]=k,(v(),W)[b+4>>>2>>>0]=k+65536,k=Yr[0],!fa.has(k)){var z=s0++;fa.set(k,z),Bf.set(z,k)}return k=fa.get(k),(v(),O)[b+8>>>2>>>0]=k,b}(),typeof MainLoop<"u"&&MainLoop.Ed&&MainLoop.pause(),Xr(()=>Kh(rt)))}else $t===2?($t=0,Xr(Xh),it(rt),rt=null,o0.forEach(Zr)):V(`invalid state: ${$t}`);return Of}}(d=>{s().then(d)});function u0(s){return s>>>=0,Nf(async()=>{var d=await We(s);return Xe(d)})}var ma=[],l0=s=>{var d=ma.length;return ma.push(s),d},d0=(s,d)=>{for(var h=Array(s),c=0;c<s;++c){var b=c,k=(v(),W)[d+4*c>>>2>>>0],z=ua[k];if(z===void 0)throw s=`parameter ${c}`,k=Jf(k),d=tt(k),it(k),new Xt(`${s} has unknown type ${d}`);h[b]=z}return h},p0=(s,d,h)=>{var c=[];return s=s(c,h),c.length&&((v(),W)[d>>>2>>>0]=Xe(c)),s},c0={},Jr=s=>{var d=c0[s];return d===void 0?tt(s):d};function f0(s,d,h){var[c,...b]=d0(s,d>>>0);d=c.ed.bind(c);var k=b.map(q=>q.dd.bind(q));s--;var z={toValue:We};switch(s=k.map((q,G)=>{var ae=`argFromPtr${G}`;return z[ae]=q,`${ae}(args${G?"+"+8*G:""})`}),h){case 0:var R="toValue(handle)";break;case 2:R="new (toValue(handle))";break;case 3:R="";break;case 1:z.getStringOrSymbol=Jr,R="toValue(handle)[getStringOrSymbol(methodName)]"}return R+=`(${s})`,c.Kd||(z.toReturnWire=d,z.emval_returnValue=p0,R=`return emval_returnValue(toReturnWire, destructorsRef, ${R})`),R=`return function (handle, methodName, destructorsRef, args) {
  ${R}
  }`,h=new Function(Object.keys(z),R)(...Object.values(z)),R=`methodCaller<(${b.map(q=>q.name)}) => ${c.name}>`,l0(Object.defineProperty(h,"name",{value:R}))}function h0(s,d){return d>>>=0,(s=We(s>>>0))==We(d)}function m0(s){return(s>>>=0)?(s=Jr(s),Xe(globalThis[s])):Xe(globalThis)}function g0(s){return s=Jr(s>>>0),Xe(t[s])}function y0(s,d){return d>>>=0,s=We(s>>>0),d=We(d),Xe(s[d])}function _0(s){9<(s>>>=0)&&(Lt[s+1]+=1)}function Df(s,d,h,c,b){return ma[s>>>0](d>>>0,h>>>0,c>>>0,b>>>0)}function w0(s,d,h,c,b){return Df(s>>>0,d>>>0,h>>>0,c>>>0,b>>>0)}function $0(){return Xe([])}function b0(s){s=We(s>>>0);for(var d=Array(s.length),h=0;h<s.length;h++)d[h]=s[h];return Xe(d)}function v0(s){return Xe(Jr(s>>>0))}function x0(){return Xe({})}function S0(s){for(var d=We(s>>>=0);d.length;){var h=d.pop();d.pop()(h)}la(s)}function k0(s,d,h){d>>>=0,h>>>=0,s=We(s>>>0),d=We(d),h=We(h),s[d]=h}function T0(s,d){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),d>>>=0,s=new Date(1e3*s),(v(),O)[d>>>2>>>0]=s.getUTCSeconds(),(v(),O)[d+4>>>2>>>0]=s.getUTCMinutes(),(v(),O)[d+8>>>2>>>0]=s.getUTCHours(),(v(),O)[d+12>>>2>>>0]=s.getUTCDate(),(v(),O)[d+16>>>2>>>0]=s.getUTCMonth(),(v(),O)[d+20>>>2>>>0]=s.getUTCFullYear()-1900,(v(),O)[d+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(v(),O)[d+28>>>2>>>0]=s}var Mf=s=>s%4==0&&(s%100!=0||s%400==0),Uf=[0,31,60,91,121,152,182,213,244,274,305,335],Pf=[0,31,59,90,120,151,181,212,243,273,304,334];function I0(s,d){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),d>>>=0,s=new Date(1e3*s),(v(),O)[d>>>2>>>0]=s.getSeconds(),(v(),O)[d+4>>>2>>>0]=s.getMinutes(),(v(),O)[d+8>>>2>>>0]=s.getHours(),(v(),O)[d+12>>>2>>>0]=s.getDate(),(v(),O)[d+16>>>2>>>0]=s.getMonth(),(v(),O)[d+20>>>2>>>0]=s.getFullYear()-1900,(v(),O)[d+24>>>2>>>0]=s.getDay();var h=(Mf(s.getFullYear())?Uf:Pf)[s.getMonth()]+s.getDate()-1|0;(v(),O)[d+28>>>2>>>0]=h,(v(),O)[d+36>>>2>>>0]=-60*s.getTimezoneOffset(),h=new Date(s.getFullYear(),6,1).getTimezoneOffset();var c=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(h!=c&&s.getTimezoneOffset()==Math.min(c,h)),(v(),O)[d+32>>>2>>>0]=s}function E0(s){s>>>=0;var d=new Date((v(),O)[s+20>>>2>>>0]+1900,(v(),O)[s+16>>>2>>>0],(v(),O)[s+12>>>2>>>0],(v(),O)[s+8>>>2>>>0],(v(),O)[s+4>>>2>>>0],(v(),O)[s>>>2>>>0],0),h=(v(),O)[s+32>>>2>>>0],c=d.getTimezoneOffset(),b=new Date(d.getFullYear(),6,1).getTimezoneOffset(),k=new Date(d.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(k,b);return 0>h?(v(),O)[s+32>>>2>>>0]=+(b!=k&&z==c):0<h!=(z==c)&&(b=Math.max(k,b),d.setTime(d.getTime()+6e4*((0<h?z:b)-c))),(v(),O)[s+24>>>2>>>0]=d.getDay(),h=(Mf(d.getFullYear())?Uf:Pf)[d.getMonth()]+d.getDate()-1|0,(v(),O)[s+28>>>2>>>0]=h,(v(),O)[s>>>2>>>0]=d.getSeconds(),(v(),O)[s+4>>>2>>>0]=d.getMinutes(),(v(),O)[s+8>>>2>>>0]=d.getHours(),(v(),O)[s+12>>>2>>>0]=d.getDate(),(v(),O)[s+16>>>2>>>0]=d.getMonth(),(v(),O)[s+20>>>2>>>0]=d.getYear(),s=d.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function Lf(s,d,h,c,b,k,z){return n?ye(16,1,s,d,h,c,b,k,z):-52}function qf(s,d,h,c,b,k){if(n)return ye(17,1,s,d,h,c,b,k)}var yr={},C0=()=>performance.timeOrigin+performance.now();function Wf(s,d){if(n)return ye(18,1,s,d);if(yr[s]&&(clearTimeout(yr[s].id),delete yr[s]),!d)return 0;var h=setTimeout(()=>{delete yr[s],Zr(()=>nh(s,performance.timeOrigin+performance.now()))},d);return yr[s]={id:h,me:d},0}function z0(s,d,h,c){s>>>=0,d>>>=0,h>>>=0,c>>>=0;var b=new Date().getFullYear(),k=new Date(b,0,1).getTimezoneOffset();b=new Date(b,6,1).getTimezoneOffset();var z=Math.max(k,b);(v(),W)[s>>>2>>>0]=60*z,(v(),O)[d>>>2>>>0]=+(k!=b),s=(d=R=>{var q=Math.abs(R);return`UTC${0<=R?"-":"+"}${String(Math.floor(q/60)).padStart(2,"0")}${String(q%60).padStart(2,"0")}`})(k),d=d(b),b<k?(wt(s,h,17),wt(d,c,17)):(wt(s,c,17),wt(d,h,17))}var A0=()=>Date.now();function O0(s,d,h){return h>>>=0,0<=s&&3>=s?(s===0?s=Date.now():s=performance.timeOrigin+performance.now(),s=Math.round(1e6*s),(v(),se)[h>>>3>>>0]=BigInt(s),0):28}var ga=[],Vf=(s,d)=>{ga.length=0;for(var h;h=(v(),X)[s++>>>0];){var c=h!=105;d+=(c&=h!=112)&&d%8?4:0,ga.push(h==112?(v(),W)[d>>>2>>>0]:h==106?(v(),se)[d>>>3>>>0]:h==105?(v(),O)[d>>>2>>>0]:(v(),P)[d>>>3>>>0]),d+=c?8:4}return ga};function B0(s,d,h){return s>>>=0,d=Vf(d>>>0,h>>>0),Sa[s](...d)}function R0(s,d,h){return s>>>=0,d=Vf(d>>>0,h>>>0),Sa[s](...d)}var N0=()=>{};function D0(s,d){return E(Te(s>>>0,d>>>0))}var M0=()=>{throw Be+=1,"unwind"};function U0(){return 4294901760}var P0=()=>navigator.hardwareConcurrency,qt={},ei=s=>{var d;return(d=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(s))?+d[1]:(d=/:(\d+):\d+(?:\)|$)/.exec(s))?2147483648|+d[1]:0},Gf=s=>{for(var d of s)(s=ei(d))&&(qt[s]=d)};function L0(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),Gf(s),qt.sd=ei(s[3]),qt.Ud=s,qt.sd}function ti(s){if(!(s=qt[s>>>0]))return 0;var d;if(d=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(s))s=d[1];else if(d=/^\s+at (.*) \(.*\)$/.exec(s))s=d[1];else{if(!(d=/^(.+?)@/.exec(s)))return 0;s=d[1]}it(ti.td??0),d=Kr(s)+1;var h=_r(d);return h&&wt(s,h,d),ti.td=h,ti.td}function q0(s){s>>>=0;var d=(v(),X).length;if(s<=d||4294901760<s)return!1;for(var h=1;4>=h;h*=2){var c=d*(1+.2/h);c=Math.min(c,s+100663296);e:{c=(Math.min(4294901760,65536*Math.ceil(Math.max(s,c)/65536))-_t.buffer.byteLength+65535)/65536|0;try{_t.grow(c),H();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1}function W0(s,d,h){if(s>>>=0,d>>>=0,qt.sd==s)var c=qt.Ud;else(c=Error().stack.toString().split(`
`))[0]=="Error"&&c.shift(),Gf(c);for(var b=3;c[b]&&ei(c[b])!=s;)++b;for(s=0;s<h&&c[s+b];++s)(v(),O)[d+4*s>>>2>>>0]=ei(c[s+b]);return s}var ya,_a={},Hf=()=>{if(!ya){var s,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(s in _a)_a[s]===void 0?delete d[s]:d[s]=_a[s];var h=[];for(s in d)h.push(`${s}=${d[s]}`);ya=h}return ya};function Ff(s,d){if(n)return ye(19,1,s,d);s>>>=0,d>>>=0;var h,c=0,b=0;for(h of Hf()){var k=d+c;(v(),W)[s+b>>>2>>>0]=k,c+=wt(h,k,1/0)+1,b+=4}return 0}function jf(s,d){if(n)return ye(20,1,s,d);s>>>=0,d>>>=0;var h=Hf();for(var c of((v(),W)[s>>>2>>>0]=h.length,s=0,h))s+=Kr(c)+1;return(v(),W)[d>>>2>>>0]=s,0}function Kf(s){return n?ye(21,1,s):52}function Zf(s,d,h,c,b){return n?ye(22,1,s,d,h,c,b):52}function Qf(s,d,h,c){return n?ye(23,1,s,d,h,c):52}function Xf(s,d,h,c){return n?ye(24,1,s,d,h,c):70}var V0=[null,[],[]];function Yf(s,d,h,c){if(n)return ye(25,1,s,d,h,c);d>>>=0,h>>>=0,c>>>=0;for(var b=0,k=0;k<h;k++){var z=(v(),W)[d>>>2>>>0],R=(v(),W)[d+4>>>2>>>0];d+=8;for(var q=0;q<R;q++){var G=s,ae=(v(),X)[z+q>>>0],fe=V0[G];ae===0||ae===10?((G===1?I:E)(mf(fe)),fe.length=0):fe.push(ae)}b+=R}return(v(),W)[c>>>2>>>0]=b,0}function G0(s){return s>>>0}n||function(){for(var s=t.numThreads-1;s--;)uf();ke.push(async()=>{var d=async function(){if(!n)return Promise.all(yt.map(of))}();et++,await d,--et==0&&ve&&(d=ve,ve=null,d())})}(),n||(_t=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),H()),t.wasmBinary&&(g=t.wasmBinary),t.stackSave=()=>ue(),t.stackRestore=s=>oe(s),t.stackAlloc=s=>ba(s),t.setValue=function(s,d,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":(v(),L)[s>>>0]=d;break;case"i16":(v(),Q)[s>>>1>>>0]=d;break;case"i32":(v(),O)[s>>>2>>>0]=d;break;case"i64":(v(),se)[s>>>3>>>0]=BigInt(d);break;case"float":(v(),Y)[s>>>2>>>0]=d;break;case"double":(v(),P)[s>>>3>>>0]=d;break;case"*":(v(),W)[s>>>2>>>0]=d;break;default:V(`invalid type for setValue: ${h}`)}},t.getValue=function(s,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return(v(),L)[s>>>0];case"i16":return(v(),Q)[s>>>1>>>0];case"i32":return(v(),O)[s>>>2>>>0];case"i64":return(v(),se)[s>>>3>>>0];case"float":return(v(),Y)[s>>>2>>>0];case"double":return(v(),P)[s>>>3>>>0];case"*":return(v(),W)[s>>>2>>>0];default:V(`invalid type for getValue: ${d}`)}},t.UTF8ToString=Te,t.stringToUTF8=wt,t.lengthBytesUTF8=Kr;var Jf,eh,ri,it,_r,wa,th,rh,ih,$a,nh,ah,le,wr,sh,oe,ba,ue,oh,va,uh,lh,dh,xa,ph,ch,fh,hh,mh,gh,yh,_h,wh,$h,bh,vh,xh,Sh,kh,Th,Ih,Eh,Ch,zh,Ah,Oh,Bh,Rh,Nh,Dh,Mh,Uh,Ph,Lh,qh,Wh,Vh,Gh,Hh,Fh,jh,Kh,Zh,Qh,Xh,ct,H0=[mr,rf,pf,gf,yf,_f,wf,$f,bf,vf,xf,Sf,kf,Tf,If,Ef,Lf,qf,Wf,Ff,jf,Kf,Zf,Qf,Xf,Yf],Sa={1124124:(s,d,h,c,b)=>{if(t===void 0||!t.jd)return 1;if((s=Te(Number(s>>>0))).startsWith("./")&&(s=s.substring(2)),!(s=t.jd.get(s)))return 2;if(d=Number(d>>>0),h=Number(h>>>0),c=Number(c>>>0),d+h>s.byteLength)return 3;try{let k=s.subarray(d,d+h);switch(b){case 0:(v(),X).set(k,c>>>0);break;case 1:t.ae?t.ae(c,k):t.Td(c,k);break;default:return 4}return 0}catch{return 4}},1124948:()=>typeof navigator<"u"&&navigator.de?1:0,1125020:(s,d,h)=>{t.Dd(s,(v(),X).subarray(d>>>0,d+h>>>0))},1125084:()=>t.ce(),1125126:s=>{t.Cd(s)},1125163:()=>{t.Md()},1125194:()=>{t.Nd()},1125223:()=>{t.Rd()},1125248:s=>t.Ld(s),1125281:s=>t.Pd(s),1125313:(s,d,h)=>{t.rd(Number(s),Number(d),Number(h),!0)},1125376:(s,d,h)=>{t.rd(Number(s),Number(d),Number(h))},1125433:()=>typeof wasmOffsetConverter<"u",1125490:s=>{t.ic("Abs",s,void 0)},1125541:s=>{t.ic("Neg",s,void 0)},1125592:s=>{t.ic("Floor",s,void 0)},1125645:s=>{t.ic("Ceil",s,void 0)},1125697:s=>{t.ic("Reciprocal",s,void 0)},1125755:s=>{t.ic("Sqrt",s,void 0)},1125807:s=>{t.ic("Exp",s,void 0)},1125858:s=>{t.ic("Erf",s,void 0)},1125909:s=>{t.ic("Sigmoid",s,void 0)},1125964:(s,d,h)=>{t.ic("HardSigmoid",s,{alpha:d,beta:h})},1126043:s=>{t.ic("HardSwish",s,void 0)},1126100:s=>{t.ic("Log",s,void 0)},1126151:s=>{t.ic("Sin",s,void 0)},1126202:s=>{t.ic("Cos",s,void 0)},1126253:s=>{t.ic("Tan",s,void 0)},1126304:s=>{t.ic("Asin",s,void 0)},1126356:s=>{t.ic("Acos",s,void 0)},1126408:s=>{t.ic("Atan",s,void 0)},1126460:s=>{t.ic("Sinh",s,void 0)},1126512:s=>{t.ic("Cosh",s,void 0)},1126564:s=>{t.ic("Asinh",s,void 0)},1126617:s=>{t.ic("Acosh",s,void 0)},1126670:s=>{t.ic("Atanh",s,void 0)},1126723:s=>{t.ic("Tanh",s,void 0)},1126775:s=>{t.ic("Not",s,void 0)},1126826:(s,d,h)=>{t.ic("Clip",s,{min:d,max:h})},1126895:s=>{t.ic("Clip",s,void 0)},1126947:(s,d)=>{t.ic("Elu",s,{alpha:d})},1127005:s=>{t.ic("Gelu",s,void 0)},1127057:s=>{t.ic("Relu",s,void 0)},1127109:(s,d)=>{t.ic("LeakyRelu",s,{alpha:d})},1127173:(s,d)=>{t.ic("ThresholdedRelu",s,{alpha:d})},1127243:(s,d)=>{t.ic("Cast",s,{to:d})},1127301:s=>{t.ic("Add",s,void 0)},1127352:s=>{t.ic("Sub",s,void 0)},1127403:s=>{t.ic("Mul",s,void 0)},1127454:s=>{t.ic("Div",s,void 0)},1127505:s=>{t.ic("Pow",s,void 0)},1127556:s=>{t.ic("Equal",s,void 0)},1127609:s=>{t.ic("Greater",s,void 0)},1127664:s=>{t.ic("GreaterOrEqual",s,void 0)},1127726:s=>{t.ic("Less",s,void 0)},1127778:s=>{t.ic("LessOrEqual",s,void 0)},1127837:(s,d,h,c,b)=>{t.ic("ReduceMean",s,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1128012:(s,d,h,c,b)=>{t.ic("ReduceMax",s,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1128186:(s,d,h,c,b)=>{t.ic("ReduceMin",s,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1128360:(s,d,h,c,b)=>{t.ic("ReduceProd",s,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1128535:(s,d,h,c,b)=>{t.ic("ReduceSum",s,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1128709:(s,d,h,c,b)=>{t.ic("ReduceL1",s,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1128882:(s,d,h,c,b)=>{t.ic("ReduceL2",s,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1129055:(s,d,h,c,b)=>{t.ic("ReduceLogSum",s,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1129232:(s,d,h,c,b)=>{t.ic("ReduceSumSquare",s,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1129412:(s,d,h,c,b)=>{t.ic("ReduceLogSumExp",s,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1129592:s=>{t.ic("Where",s,void 0)},1129645:(s,d,h)=>{t.ic("Transpose",s,{perm:d?Array.from((v(),O).subarray(Number(d)>>>0,Number(h)>>>0)):[]})},1129769:(s,d,h,c)=>{t.ic("DepthToSpace",s,{blocksize:d,mode:Te(h),format:c?"NHWC":"NCHW"})},1129902:(s,d,h,c)=>{t.ic("DepthToSpace",s,{blocksize:d,mode:Te(h),format:c?"NHWC":"NCHW"})},1130035:(s,d,h,c)=>{t.ic("DFT",s,{axis:d,inverse:h,onesided:c})},1130127:(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e,bt)=>{t.ic("ConvTranspose",s,{format:q?"NHWC":"NCHW",autoPad:d,dilations:[h],group:c,kernelShape:[b],pads:[k,z],strides:[R],wIsConst:()=>!!(v(),L)[G>>>0],outputPadding:ae?Array.from((v(),O).subarray(Number(ae)>>>0,Number(fe)>>>0)):[],outputShape:ge?Array.from((v(),O).subarray(Number(ge)>>>0,Number(_e)>>>0)):[],activation:Te(bt)})},1130560:(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e)=>{t.ic("ConvTranspose",s,{format:R?"NHWC":"NCHW",autoPad:d,dilations:Array.from((v(),O).subarray(Number(h)>>>0,(Number(h)>>>0)+2>>>0)),group:c,kernelShape:Array.from((v(),O).subarray(Number(b)>>>0,(Number(b)>>>0)+2>>>0)),pads:Array.from((v(),O).subarray(Number(k)>>>0,(Number(k)>>>0)+4>>>0)),strides:Array.from((v(),O).subarray(Number(z)>>>0,(Number(z)>>>0)+2>>>0)),wIsConst:()=>!!(v(),L)[q>>>0],outputPadding:G?Array.from((v(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],outputShape:fe?Array.from((v(),O).subarray(Number(fe)>>>0,Number(ge)>>>0)):[],activation:Te(_e)})},1131221:(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e,bt)=>{t.ic("ConvTranspose",s,{format:q?"NHWC":"NCHW",autoPad:d,dilations:[h],group:c,kernelShape:[b],pads:[k,z],strides:[R],wIsConst:()=>!!(v(),L)[G>>>0],outputPadding:ae?Array.from((v(),O).subarray(Number(ae)>>>0,Number(fe)>>>0)):[],outputShape:ge?Array.from((v(),O).subarray(Number(ge)>>>0,Number(_e)>>>0)):[],activation:Te(bt)})},1131654:(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e)=>{t.ic("ConvTranspose",s,{format:R?"NHWC":"NCHW",autoPad:d,dilations:Array.from((v(),O).subarray(Number(h)>>>0,(Number(h)>>>0)+2>>>0)),group:c,kernelShape:Array.from((v(),O).subarray(Number(b)>>>0,(Number(b)>>>0)+2>>>0)),pads:Array.from((v(),O).subarray(Number(k)>>>0,(Number(k)>>>0)+4>>>0)),strides:Array.from((v(),O).subarray(Number(z)>>>0,(Number(z)>>>0)+2>>>0)),wIsConst:()=>!!(v(),L)[q>>>0],outputPadding:G?Array.from((v(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],outputShape:fe?Array.from((v(),O).subarray(Number(fe)>>>0,Number(ge)>>>0)):[],activation:Te(_e)})},1132315:(s,d)=>{t.ic("GlobalAveragePool",s,{format:d?"NHWC":"NCHW"})},1132406:(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e)=>{t.ic("AveragePool",s,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:h,count_include_pad:c,storage_order:b,dilations:k?Array.from((v(),O).subarray(Number(k)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((v(),O).subarray(Number(R)>>>0,Number(q)>>>0)):[],pads:G?Array.from((v(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:fe?Array.from((v(),O).subarray(Number(fe)>>>0,Number(ge)>>>0)):[]})},1132885:(s,d)=>{t.ic("GlobalAveragePool",s,{format:d?"NHWC":"NCHW"})},1132976:(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e)=>{t.ic("AveragePool",s,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:h,count_include_pad:c,storage_order:b,dilations:k?Array.from((v(),O).subarray(Number(k)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((v(),O).subarray(Number(R)>>>0,Number(q)>>>0)):[],pads:G?Array.from((v(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:fe?Array.from((v(),O).subarray(Number(fe)>>>0,Number(ge)>>>0)):[]})},1133455:(s,d)=>{t.ic("GlobalMaxPool",s,{format:d?"NHWC":"NCHW"})},1133542:(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e)=>{t.ic("MaxPool",s,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:h,count_include_pad:c,storage_order:b,dilations:k?Array.from((v(),O).subarray(Number(k)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((v(),O).subarray(Number(R)>>>0,Number(q)>>>0)):[],pads:G?Array.from((v(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:fe?Array.from((v(),O).subarray(Number(fe)>>>0,Number(ge)>>>0)):[]})},1134017:(s,d)=>{t.ic("GlobalMaxPool",s,{format:d?"NHWC":"NCHW"})},1134104:(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e)=>{t.ic("MaxPool",s,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:h,count_include_pad:c,storage_order:b,dilations:k?Array.from((v(),O).subarray(Number(k)>>>0,Number(z)>>>0)):[],kernel_shape:R?Array.from((v(),O).subarray(Number(R)>>>0,Number(q)>>>0)):[],pads:G?Array.from((v(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],strides:fe?Array.from((v(),O).subarray(Number(fe)>>>0,Number(ge)>>>0)):[]})},1134579:(s,d,h,c,b)=>{t.ic("Gemm",s,{alpha:d,beta:h,transA:c,transB:b})},1134683:s=>{t.ic("MatMul",s,void 0)},1134737:(s,d,h,c)=>{t.ic("ArgMax",s,{keepDims:!!d,selectLastIndex:!!h,axis:c})},1134845:(s,d,h,c)=>{t.ic("ArgMin",s,{keepDims:!!d,selectLastIndex:!!h,axis:c})},1134953:(s,d)=>{t.ic("Softmax",s,{axis:d})},1135016:(s,d)=>{t.ic("Concat",s,{axis:d})},1135076:(s,d,h,c,b)=>{t.ic("Split",s,{axis:d,numOutputs:h,splitSizes:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1135232:s=>{t.ic("Expand",s,void 0)},1135286:(s,d)=>{t.ic("Gather",s,{axis:Number(d)})},1135357:(s,d)=>{t.ic("GatherElements",s,{axis:Number(d)})},1135436:(s,d)=>{t.ic("GatherND",s,{batch_dims:Number(d)})},1135515:(s,d,h,c,b,k,z,R,q,G,ae)=>{t.ic("Resize",s,{antialias:d,axes:h?Array.from((v(),O).subarray(Number(h)>>>0,Number(c)>>>0)):[],coordinateTransformMode:Te(b),cubicCoeffA:k,excludeOutside:z,extrapolationValue:R,keepAspectRatioPolicy:Te(q),mode:Te(G),nearestMode:Te(ae)})},1135877:(s,d,h,c,b,k,z)=>{t.ic("Slice",s,{starts:d?Array.from((v(),O).subarray(Number(d)>>>0,Number(h)>>>0)):[],ends:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[],axes:k?Array.from((v(),O).subarray(Number(k)>>>0,Number(z)>>>0)):[]})},1136141:s=>{t.ic("Tile",s,void 0)},1136193:(s,d,h)=>{t.ic("InstanceNormalization",s,{epsilon:d,format:h?"NHWC":"NCHW"})},1136307:(s,d,h)=>{t.ic("InstanceNormalization",s,{epsilon:d,format:h?"NHWC":"NCHW"})},1136421:s=>{t.ic("Range",s,void 0)},1136474:(s,d)=>{t.ic("Einsum",s,{equation:Te(d)})},1136555:(s,d,h,c,b)=>{t.ic("Pad",s,{mode:d,value:h,pads:c?Array.from((v(),O).subarray(Number(c)>>>0,Number(b)>>>0)):[]})},1136698:(s,d,h,c,b,k)=>{t.ic("BatchNormalization",s,{epsilon:d,momentum:h,spatial:!!b,trainingMode:!!c,format:k?"NHWC":"NCHW"})},1136867:(s,d,h,c,b,k)=>{t.ic("BatchNormalization",s,{epsilon:d,momentum:h,spatial:!!b,trainingMode:!!c,format:k?"NHWC":"NCHW"})},1137036:(s,d,h)=>{t.ic("CumSum",s,{exclusive:Number(d),reverse:Number(h)})},1137133:(s,d,h)=>{t.ic("DequantizeLinear",s,{axis:d,blockSize:h})},1137223:(s,d,h,c,b)=>{t.ic("GridSample",s,{align_corners:d,mode:Te(h),padding_mode:Te(c),format:b?"NHWC":"NCHW"})},1137393:(s,d,h,c,b)=>{t.ic("GridSample",s,{align_corners:d,mode:Te(h),padding_mode:Te(c),format:b?"NHWC":"NCHW"})},1137563:(s,d)=>{t.ic("ScatterND",s,{reduction:Te(d)})},1137648:(s,d,h,c,b,k,z,R,q)=>{t.ic("Attention",s,{numHeads:d,isUnidirectional:h,maskFilterValue:c,scale:b,doRotary:k,qkvHiddenSizes:z?Array.from((v(),O).subarray(Number(R)>>>0,Number(R)+z>>>0)):[],pastPresentShareBuffer:!!q})},1137920:s=>{t.ic("BiasAdd",s,void 0)},1137975:s=>{t.ic("BiasSplitGelu",s,void 0)},1138036:s=>{t.ic("FastGelu",s,void 0)},1138092:(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e,bt,ka)=>{t.ic("Conv",s,{format:fe?"NHWC":"NCHW",auto_pad:d,dilations:h?Array.from((v(),O).subarray(Number(h)>>>0,Number(c)>>>0)):[],group:b,kernel_shape:k?Array.from((v(),O).subarray(Number(k)>>>0,Number(z)>>>0)):[],pads:R?Array.from((v(),O).subarray(Number(R)>>>0,Number(q)>>>0)):[],strides:G?Array.from((v(),O).subarray(Number(G)>>>0,Number(ae)>>>0)):[],w_is_const:()=>!!(v(),L)[Number(ge)>>>0],activation:Te(_e),activation_params:bt?Array.from((v(),Y).subarray(Number(bt)>>>0,Number(ka)>>>0)):[]})},1138676:s=>{t.ic("Gelu",s,void 0)},1138728:(s,d,h,c,b,k,z,R,q)=>{t.ic("GroupQueryAttention",s,{numHeads:d,kvNumHeads:h,scale:c,softcap:b,doRotary:k,rotaryInterleaved:z,smoothSoftmax:R,localWindowSize:q})},1138945:(s,d,h,c)=>{t.ic("LayerNormalization",s,{axis:d,epsilon:h,simplified:!!c})},1139056:(s,d,h,c)=>{t.ic("LayerNormalization",s,{axis:d,epsilon:h,simplified:!!c})},1139167:(s,d,h,c,b,k)=>{t.ic("MatMulNBits",s,{k:d,n:h,accuracyLevel:c,bits:b,blockSize:k})},1139294:(s,d,h,c,b,k)=>{t.ic("MultiHeadAttention",s,{numHeads:d,isUnidirectional:h,maskFilterValue:c,scale:b,doRotary:k})},1139453:(s,d)=>{t.ic("QuickGelu",s,{alpha:d})},1139517:(s,d,h,c,b)=>{t.ic("RotaryEmbedding",s,{interleaved:!!d,numHeads:h,rotaryEmbeddingDim:c,scale:b})},1139656:(s,d,h)=>{t.ic("SkipLayerNormalization",s,{epsilon:d,simplified:!!h})},1139758:(s,d,h)=>{t.ic("SkipLayerNormalization",s,{epsilon:d,simplified:!!h})},1139860:(s,d,h,c)=>{t.ic("GatherBlockQuantized",s,{gatherAxis:d,quantizeAxis:h,blockSize:c})},1139981:s=>{t.Qd(s)},1140015:(s,d)=>t.Sd(Number(s),Number(d),t.hd.Vd,t.hd.errors)};function F0(s,d,h){return Nf(async()=>{await t.Od(Number(s),Number(d),Number(h))})}function j0(){return typeof wasmOffsetConverter<"u"}function K0(s,d,h,c){var b=ue();try{return wh(s,d,h,c)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function Z0(s,d,h){var c=ue();try{return yh(s,d,h)}catch(b){if(oe(c),b!==b+0)throw b;le(1,0)}}function Q0(s){var d=ue();try{mh(s)}catch(h){if(oe(d),h!==h+0)throw h;le(1,0)}}function X0(s,d){var h=ue();try{return xa(s,d)}catch(c){if(oe(h),c!==c+0)throw c;le(1,0)}}function Y0(s,d,h){var c=ue();try{dh(s,d,h)}catch(b){if(oe(c),b!==b+0)throw b;le(1,0)}}function J0(s,d,h,c){var b=ue();try{return Sh(s,d,h,c)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function ey(s,d){var h=ue();try{$h(s,d)}catch(c){if(oe(h),c!==c+0)throw c;le(1,0)}}function ty(s,d,h,c,b,k,z){var R=ue();try{return _h(s,d,h,c,b,k,z)}catch(q){if(oe(R),q!==q+0)throw q;le(1,0)}}function ry(s,d,h,c,b,k){var z=ue();try{ph(s,d,h,c,b,k)}catch(R){if(oe(z),R!==R+0)throw R;le(1,0)}}function iy(s,d,h,c){var b=ue();try{fh(s,d,h,c)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function ny(s,d,h,c,b){var k=ue();try{gh(s,d,h,c,b)}catch(z){if(oe(k),z!==z+0)throw z;le(1,0)}}function ay(s,d,h,c,b,k,z){var R=ue();try{vh(s,d,h,c,b,k,z)}catch(q){if(oe(R),q!==q+0)throw q;le(1,0)}}function sy(s,d,h,c,b,k,z){var R=ue();try{xh(s,d,h,c,b,k,z)}catch(q){if(oe(R),q!==q+0)throw q;le(1,0)}}function oy(s,d,h,c,b,k,z,R){var q=ue();try{Eh(s,d,h,c,b,k,z,R)}catch(G){if(oe(q),G!==G+0)throw G;le(1,0)}}function uy(s,d,h,c,b){var k=ue();try{return bh(s,d,h,c,b)}catch(z){if(oe(k),z!==z+0)throw z;le(1,0)}}function ly(s,d,h){var c=ue();try{return hh(s,d,h)}catch(b){if(oe(c),b!==b+0)throw b;le(1,0)}}function dy(s,d,h,c,b,k,z,R){var q=ue();try{Ch(s,d,h,c,b,k,z,R)}catch(G){if(oe(q),G!==G+0)throw G;le(1,0)}}function py(s,d,h,c,b,k,z,R,q,G,ae,fe){var ge=ue();try{kh(s,d,h,c,b,k,z,R,q,G,ae,fe)}catch(_e){if(oe(ge),_e!==_e+0)throw _e;le(1,0)}}function cy(s,d,h){var c=ue();try{return zh(s,d,h)}catch(b){if(oe(c),b!==b+0)throw b;return le(1,0),0n}}function fy(s,d,h,c,b,k,z,R,q){var G=ue();try{ch(s,d,h,c,b,k,z,R,q)}catch(ae){if(oe(G),ae!==ae+0)throw ae;le(1,0)}}function hy(s){var d=ue();try{return Ah(s)}catch(h){if(oe(d),h!==h+0)throw h;le(1,0)}}function my(s,d){var h=ue();try{return Fh(s,d)}catch(c){if(oe(h),c!==c+0)throw c;return le(1,0),0n}}function gy(s,d,h,c){var b=ue();try{return Oh(s,d,h,c)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function yy(s,d,h,c,b,k,z){var R=ue();try{jh(s,d,h,c,b,k,z)}catch(q){if(oe(R),q!==q+0)throw q;le(1,0)}}function _y(s){var d=ue();try{return Bh(s)}catch(h){if(oe(d),h!==h+0)throw h;return le(1,0),0n}}function wy(s,d,h,c,b){var k=ue();try{return Ph(s,d,h,c,b)}catch(z){if(oe(k),z!==z+0)throw z;le(1,0)}}function $y(s,d,h,c,b,k){var z=ue();try{return Lh(s,d,h,c,b,k)}catch(R){if(oe(z),R!==R+0)throw R;le(1,0)}}function by(s,d,h,c,b,k){var z=ue();try{return Th(s,d,h,c,b,k)}catch(R){if(oe(z),R!==R+0)throw R;le(1,0)}}function vy(s,d,h,c,b,k){var z=ue();try{return qh(s,d,h,c,b,k)}catch(R){if(oe(z),R!==R+0)throw R;le(1,0)}}function xy(s,d,h,c,b,k,z,R){var q=ue();try{return Ih(s,d,h,c,b,k,z,R)}catch(G){if(oe(q),G!==G+0)throw G;le(1,0)}}function Sy(s,d,h,c,b){var k=ue();try{return Wh(s,d,h,c,b)}catch(z){if(oe(k),z!==z+0)throw z;return le(1,0),0n}}function ky(s,d,h,c){var b=ue();try{return Vh(s,d,h,c)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function Ty(s,d,h,c){var b=ue();try{return Gh(s,d,h,c)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function Iy(s,d,h,c,b,k,z,R,q,G,ae,fe){var ge=ue();try{return Hh(s,d,h,c,b,k,z,R,q,G,ae,fe)}catch(_e){if(oe(ge),_e!==_e+0)throw _e;le(1,0)}}function Ey(s,d,h,c,b,k,z,R,q,G,ae){var fe=ue();try{Mh(s,d,h,c,b,k,z,R,q,G,ae)}catch(ge){if(oe(fe),ge!==ge+0)throw ge;le(1,0)}}function Cy(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e,bt,ka){var By=ue();try{Uh(s,d,h,c,b,k,z,R,q,G,ae,fe,ge,_e,bt,ka)}catch(Ta){if(oe(By),Ta!==Ta+0)throw Ta;le(1,0)}}function zy(s,d,h){var c=ue();try{return Rh(s,d,h)}catch(b){if(oe(c),b!==b+0)throw b;le(1,0)}}function Ay(s,d,h){var c=ue();try{return Nh(s,d,h)}catch(b){if(oe(c),b!==b+0)throw b;le(1,0)}}function Oy(s,d,h,c){var b=ue();try{Dh(s,d,h,c)}catch(k){if(oe(b),k!==k+0)throw k;le(1,0)}}function ii(){if(0<et)ve=ii;else if(n)x?.(t),F();else{for(var s=ke;0<s.length;)s.shift()(t);0<et?ve=ii:(t.calledRun=!0,C||(F(),x?.(t)))}}return n||(ct=await Qe(),ii()),t.PTR_SIZE=4,U?t:new Promise((s,d)=>{x=s,S=d})}var Za,Qa,bm=M(()=>{"use strict";Za=Ka,Qa=globalThis.self?.name?.startsWith("em-pthread"),Qa&&Ka()}),_i,wi,Xa,Ue,Ya,vr,Ja,es,$i,ts,bi,rs,vi,is,xi=M(()=>{"use strict";mi(),_i=typeof location>"u"?void 0:location.origin,wi=self.location.href>"file:"&&self.location.href<"file;",Xa=()=>{if(wi){let e=URL;return new URL(new e("ort.bundle.min.mjs",self.location.href).href,_i).href}return self.location.href},Ue=Xa(),Ya=()=>{if(Ue&&!Ue.startsWith("blob:"))return Ue.substring(0,Ue.lastIndexOf("/")+1)},vr=(e,t)=>{try{let r=t??Ue;return(r?new URL(e,r):new URL(e)).origin===_i}catch{return!1}},Ja=(e,t)=>{let r=t??Ue;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},es=(e,t)=>`${t??"./"}${e}`,$i=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},ts=async e=>(await import(e)).default,bi=($m(),Yt(Ha)).default,rs=async()=>{if(!Ue)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(vr(Ue))return[void 0,bi()];let e=await $i(Ue);return[e,bi(e)]},vi=(bm(),Yt(ja)).default,is=async(e,t,r,i)=>{let n=vi&&!(e||t);if(n)if(Ue)n=vr(Ue)||i&&!r;else if(i&&!r)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,vi];{let a="ort-wasm-simd-threaded.jsep.mjs",o=e??Ja(a,t),u=r&&o&&!vr(o,t),l=u?await $i(o):o??es(a,t);return[u?l:void 0,await ts(l)]}}}),Si,xr,er,ki,ns,as,ss,Ti,me,Tt=M(()=>{"use strict";xi(),xr=!1,er=!1,ki=!1,ns=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},as=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},ss=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ti=async e=>{if(xr)return Promise.resolve();if(er)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(ki)throw new Error("previous call to 'initializeWebAssembly()' failed.");er=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!ss())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!as())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=ns();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,a=typeof n=="string"?n:void 0,o=n?.mjs,u=o?.href??o,l=n?.wasm,p=l?.href??l,f=e.wasmBinary,[m,g]=await is(u,a,r>1,!!f||!!p),_=!1,y=[];if(t>0&&y.push(new Promise(x=>{setTimeout(()=>{_=!0,x()},t)})),y.push(new Promise((x,S)=>{let $={numThreads:r};if(f)$.wasmBinary=f,$.locateFile=w=>w;else if(p||a)$.locateFile=w=>p??a+w;else if(u&&u.indexOf("blob:")!==0)$.locateFile=w=>new URL(w,u).href;else if(m){let w=Ya();w&&($.locateFile=T=>w+T)}g($).then(w=>{er=!1,xr=!0,Si=w,x(),m&&URL.revokeObjectURL(m)},w=>{er=!1,ki=!0,S(w)})})),await Promise.race(y),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},me=()=>{if(xr&&Si)return Si;throw new Error("WebAssembly is not initialized yet.")}}),Ge,Sr,pe,Ii=M(()=>{"use strict";Tt(),Ge=(e,t)=>{let r=me(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},Sr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,a])=>{let o=t?t+n:n;if(typeof a=="object")Sr(a,o+".",r,i);else if(typeof a=="string"||typeof a=="number")i(o,a.toString());else if(typeof a=="boolean")i(o,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},pe=e=>{let t=me(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let a=Number(t.getValue(n,i===4?"i32":"i64")),o=t.getValue(n+i,"*"),u=o?t.UTF8ToString(o):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),os,vm=M(()=>{"use strict";Tt(),Ii(),os=(e,t)=>{let r=me(),i=0,n=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let o=0;e?.tag!==void 0&&(o=Ge(e.tag,n)),i=r._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,o),i===0&&pe("Can't create run options."),e?.extra!==void 0&&Sr(e.extra,"",new WeakSet,(u,l)=>{let p=Ge(u,n),f=Ge(l,n);r._OrtAddRunConfigEntry(i,p,f)!==0&&pe(`Can't set a run config entry: ${u} - ${l}.`)});for(let u of t)r._OrtRunOptionsAddActiveLoraAdapter(i,u)!==0&&pe("Can't add an active LoRA adapter.");return[i,n]}catch(o){throw i!==0&&r._OrtReleaseRunOptions(i),n.forEach(u=>r._free(u)),o}}}),us,ls,ds,It,ps,cs,xm=M(()=>{"use strict";Tt(),Ii(),us=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},ls=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},ds=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},It=(e,t,r,i)=>{let n=Ge(t,i),a=Ge(r,i);me()._OrtAddSessionConfigEntry(e,n,a)!==0&&pe(`Can't set a session config entry: ${t} - ${r}.`)},ps=async(e,t,r)=>{let i=t.executionProviders;for(let n of i){let a=typeof n=="string"?n:n.name,o=[],u;switch(a){case"webnn":if(a="WEBNN",It(e,"session.disable_quant_qdq","1",r),It(e,"session.disable_qdq_constant_folding","1",r),typeof n!="string"){let g=n?.deviceType;g&&It(e,"deviceType",g,r)}break;case"webgpu":if(a="JS",typeof n!="string"){let g=n;if(g?.preferredLayout){if(g.preferredLayout!=="NCHW"&&g.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${g.preferredLayout}`);It(e,"preferredLayout",g.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let l=o.length,p=0,f=0;if(l>0){p=me()._malloc(l*me().PTR_SIZE),r.push(p),f=me()._malloc(l*me().PTR_SIZE),r.push(f);for(let g=0;g<l;g++)me().setValue(p+g*me().PTR_SIZE,o[g][0],"*"),me().setValue(f+g*me().PTR_SIZE,o[g][1],"*")}let m;if(u===void 0){let g=Ge(a,r);m=await me()._OrtAppendExecutionProvider(e,g,p,f,l)}m!==0&&pe(`Can't append execution provider: ${a}.`)}},cs=async e=>{let t=me(),r=0,i=[],n=e||{};ds(n);try{let a=us(n.graphOptimizationLevel??"all"),o=ls(n.executionMode??"sequential"),u=typeof n.logId=="string"?Ge(n.logId,i):0,l=n.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let p=n.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let f=typeof n.optimizedModelFilePath=="string"?Ge(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(a,!!n.enableCpuMemArena,!!n.enableMemPattern,o,!!n.enableProfiling,0,u,l,p,f),r===0&&pe("Can't create session options."),n.executionProviders&&await ps(r,n,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);It(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[m,g]of Object.entries(n.freeDimensionOverrides)){if(typeof m!="string")throw new Error(`free dimension override name must be a string: ${m}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let _=Ge(m,i);t._OrtAddFreeDimensionOverride(r,_,g)!==0&&pe(`Can't set a free dimension override: ${m} - ${g}.`)}return n.extra!==void 0&&Sr(n.extra,"",new WeakSet,(m,g)=>{It(r,m,g,i)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&pe("Can't release session options."),i.forEach(o=>t._free(o)),a}}}),Et,ot,Ct,kr,Tr,Ei,Ci,zi,ee=M(()=>{"use strict";Et=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ot=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Ct=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,a)=>n*a,1);return r>0?Math.ceil(i*r):void 0},kr=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Tr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ei=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ci=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",zi=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Ir,Ai=M(()=>{"use strict";mi(),Ir=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),a;try{a=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let o=0;for(;;){let{done:u,value:l}=await n.read();if(u)break;let p=l.byteLength;new Uint8Array(a,o,p).set(l),o+=p}return new Uint8Array(a,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),fs,hs,ms,gs,Oi,ys,de,ut=M(()=>{"use strict";ee(),fs=["V","I","W","E","F"],hs=(e,t)=>{console.log(`[${fs[e]},${new Date().toISOString()}]${t}`)},Oi=(e,t)=>{ms=e,gs=t},ys=(e,t)=>{let r=Tr(e),i=Tr(ms);r>=i&&hs(r,typeof t=="function"?t():t)},de=(...e)=>{gs&&ys(...e)}}),_s,Ft,B,Er,ws,$s,bs,re=M(()=>{"use strict";_s=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Ft=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let a=Math.max(e.length,t.length),o=new Array(a);if(r){if(i<2||n<2)return;let u=_s.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(u===void 0)return;[o[a-2],o[a-1]]=u}for(let u=r?3:1;u<=a;u++){let l=i-u<0?1:e[i-u],p=n-u<0?1:t[n-u];if(l!==p&&l>1&&p>1)return;let f=Math.max(l,p);if(l&&p)o[a-u]=Math.max(l,p);else{if(f>1)return;o[a-u]=0}}return o}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},B=class ni{static size(t){return ni.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),a=i-1;for(;a>=0;){if(t[a]%r===0){n[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");n[a]=1,r/=t[a],a--}for(a--;a>=0;a--)n[a]=t[a];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return ni.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return ni.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let a=r;a<i;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[a])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,a)=>n+r[a]+r[a+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},Er=class vt{static adjustPoolAttributes(t,r,i,n,a,o){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length*2;u++)if(u<o.length){if(o[u]<0)throw new Error("pad should be greater than or equal to 1")}else o.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(o[u]>=i[u]||o[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,a,o,u){if(u){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)vt.adjustPadAndReturnShape(t[l+(o?1:2)],r[l],i[l],n[l],a,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,n,a,o,u,l=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let p=[r[0],r[1]];return vt.computeShapeHelper(t,r,p,i,n,a,o,u,l),p}static computeConvOutputShape(t,r,i,n,a,o,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return vt.computeShapeHelper(!1,t,l,i,n,a,o,u),l}static computeShapeHelper(t,r,i,n,a,o,u,l,p=0){if(t)for(let f=0;f<r.length-2;f++)i.push(1);else for(let f=0;f<r.length-2;f++)i.push(vt.adjustPadAndReturnShape(r[f+2],n[f],a[f],o[f],u,f,f+r.length-2,l,p))}static computeOutputSize(t,r,i,n,a){let o=Math.floor(t/r)+1;return a===1&&(o=Math.ceil(t/r)+1,(o-1)*r>=i+n&&(o-=1)),o}static adjustPadAndReturnShape(t,r,i,n,a,o,u,l,p=0){let f=i*(n-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[o]=0,a[u]=0,vt.computeOutputSize(t-f,r,t,0,p);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let m=(Math.floor((t+r-1)/r)-1)*r+n-t;return a[o]=Math.floor(l==="SAME_LOWER"?(m+1)/2:m/2),a[u]=m-a[o],vt.computeOutputSize(t+a[o]+a[u]-f,r,t,a[o],p)}default:throw new Error("Unsupported AutoPad type")}else return vt.computeOutputSize(t+a[o]+a[u]-f,r,t,a[o],p)}},ws=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let a,o,u;t?(a=e[1],o=e[0]):(a=e[0],o=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==o)throw new Error("dimension mismatch");if(a<=0||u<=0||o<=0)throw new Error("invalid shape specified");if(n&&!Ft.isValidBroadcast(n,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,o]}},$s=-34028234663852886e22,bs=34028234663852886e22}),Bi,vs=M(()=>{"use strict";ee(),Bi=(e,t)=>new(kr(t))(e)}),Ri,xs,Ni,Ss,Di,ks,Mi,Ui,Pi,Ts,Is,Sm=M(()=>{"use strict";ee(),ut(),Ri=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),xs=(e,t)=>{if(t==="int32")return e;let r=Ri.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,a=new(kr(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let o=new Int32Array(n);for(let u=0;u<n;u++){let l=a[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");o[u]=Number(l)}return new Uint8Array(o.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let o=Int32Array.from(a,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Ni=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Ss=1,Di=()=>Ss++,ks=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Mi=(e,t)=>{let r=Ri.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},Ui=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:a,fallbackDataType:o}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=a,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Mi(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Ni(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return new Uint8Array(r).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},Pi=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),o;if(!a?.input.dataTypes.includes(t)){if(o=ks.get(t),!o||!a?.input.dataTypes.includes(o))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Mi(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,o),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=xs(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Ni(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Ts=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Di();return this.tensorTrackersById.set(e,new Pi(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),a=Di(),o=new Ui({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(a,new Pi(this,o)),this.externalTensors.add(o),a}async getCachedTensor(e,t,r,i,n,a,o){let u=this.getMLContext(e);for(let[p,f]of this.freeTensors.entries())if(f.canReuseTensor(u,t,r)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${r}`);let m=this.freeTensors.splice(p,1)[0];return m.sessionId=e,m}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:o??t,shape:r,dimensions:r,usage:i,writable:n,readable:a});return new Ui({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Is=(...e)=>new Ts(...e)}),tr,Es,Cs,km=M(()=>{"use strict";ee(),Tt(),vs(),Sm(),ut(),tr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Es=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,a)=>n===i[a]&&e[n]===t[n])},Cs=class{constructor(e){this.tensorManager=Is(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Oi(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Es(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let a=tr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,i,n)}async createTemporaryTensor(e,t,r){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=tr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!me().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Bi(r,t)}}registerMLTensor(e,t,r,i){let n=tr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.registerTensor(e,t,n,i);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${a}}`),a}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=tr.get(Et(t)),n=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!n?.input.dataTypes.includes(i):!!n?.output.dataTypes.includes(i)}flush(){}}}),Li=M(()=>{"use strict"}),qi,Cr,zr,zs,As,Wi,Vi,Os,Bs,Tm=M(()=>{"use strict";ut(),Li(),qi=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Cr=[],zr=e=>Math.ceil(Number(e)/16)*16,zs=e=>{for(let t=0;t<Cr.length;t++){let r=Cr[t];if(e<=r)return r}return Math.ceil(e/16)*16},As=1,Wi=()=>As++,Vi=async(e,t,r,i)=>{let n=zr(r),a=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,a,0,n),e.flush(),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{a.destroy()}},Os=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of qi)Cr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,a=zr(n),o=this.storageCache.get(e);if(!o)throw new Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${n}`);if(a===n&&i%4===0)this.backend.device.queue.writeBuffer(o.gpuData.buffer,0,r,i,n);else{let u=new Uint8Array(a);u.set(t),this.backend.device.queue.writeBuffer(o.gpuData.buffer,0,u,0,a)}de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=zr(r.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=Wi();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=zs(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||a){let u=(n?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let o={id:Wi(),type:0,buffer:i};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Vi(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=qi.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Bs=(...e)=>new Os(...e)}),Rs,he,$e=M(()=>{"use strict";Rs=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},he=e=>new Rs(e)}),jt,Ar,Ee,Ce,Z,be,Gi,Kt,ft,K,rr,N,j,Ns,Hi,Ds,Ms,ie=M(()=>{"use strict";ee(),re(),jt=64,Ar=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ee=(e,t=1)=>{let r=Ar(e,t);return typeof r=="string"?r:r[0]},Ce=(e,t=1)=>{let r=Ar(e,t);return typeof r=="string"?r:r[1]},Z=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:B.computeStrides(r)})}),t},be=e=>e%4===0?4:e%2===0?2:1,Gi=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Kt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,ft=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,rr=(e,t,r,i,n)=>{let a=typeof r=="number",o=a?r:r.length,u=[...new Array(o).keys()],l=o<2?"u32":o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,p=Ar(t,n),f=typeof p=="string"?p:p[1],m=typeof p=="string"?p:p[0],g={indices:l,value:f,storage:m,tensor:t},_=U=>typeof U=="string"?U:`${U}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},x=a?"uniforms.":"",S=`${x}${e}_shape`,$=`${x}${e}_strides`,w="";for(let U=0;U<o-1;U++)w+=`
    let dim${U} = current / ${K($,U,o)};
    let rest${U} = current % ${K($,U,o)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;w+=`indices[${o-1}] = current;`;let T=o<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,I=U=>(y.offsetToIndices=!0,o<2?U:`o2i_${e}(${U})`),E=[];if(o>=2)for(let U=o-1;U>=0;U--)E.push(`${K($,U,o)} * (indices[${U}])`);let C=o<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${E.join("+")};
  }`,A=U=>(y.indicesToOffset=!0,o<2?U:`i2o_${e}(${U})`),v=(...U)=>o===0?"0u":`${g.indices}(${U.map(_).join(",")})`,D=(U,H)=>o<2?`${U}`:`${K(U,H,o)}`,L=(U,H,F)=>o<2?`${U}=${F};`:`${K(U,H,o)}=${F};`,X={},Q=(U,H)=>{y.broadcastedIndicesToOffset=!0;let F=`${H.name}broadcastedIndicesTo${e}Offset`;if(F in X)return`${F}(${U})`;let V=[];for(let Se=o-1;Se>=0;Se--){let Qe=H.indicesGet("outputIndices",Se+H.rank-o);V.push(`${D($,Se)} * (${Qe} % ${D(S,Se)})`)}return X[F]=`fn ${F}(outputIndices: ${H.type.indices}) -> u32 {
             return ${V.length>0?V.join("+"):"0u"};
           }`,`${F}(${U})`},J=(U,H)=>(()=>{if(g.storage===g.value)return`${e}[${U}]=${H};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${H}), select(0u, 0xFFFFFFFFu, ${H} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${H}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${H}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),O=U=>(()=>{if(g.storage===g.value)return`${e}[${U}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${U}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${U}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),W=o<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${f} {
    return ${O(`i2o_${e}(indices)`)};
  }`,Y=o<2?"":(()=>{let U=u.map(F=>`d${F}: u32`).join(", "),H=u.map(F=>`d${F}`).join(", ");return`
  fn get_${e}(${U}) -> ${f} {
    return get_${e}ByIndices(${v(H)});
  }`})(),P=(...U)=>{if(U.length!==o)throw new Error(`indices length must be ${o}`);let H=U.map(_).join(",");return o===0?O("0u"):o===1?O(H[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${H})`)},se=U=>o<2?O(U):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${U})`),ne=o<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${f}) {
    ${J(`i2o_${e}(indices)`,"value")}
  }`,te=o<2?"":(()=>{let U=u.map(F=>`d${F}: u32`).join(", "),H=u.map(F=>`d${F}`).join(", ");return`
  fn set_${e}(${U}, value: ${f}) {
    set_${e}ByIndices(${v(H)}, value);
  }`})();return{impl:()=>{let U=[],H=!1;return y.offsetToIndices&&(U.push(T),H=!0),y.indicesToOffset&&(U.push(C),H=!0),y.broadcastedIndicesToOffset&&(Object.values(X).forEach(F=>U.push(F)),H=!0),y.set&&(U.push(te),H=!0),y.setByIndices&&(U.push(ne),H=!0),y.get&&(U.push(Y),H=!0),y.getByIndices&&(U.push(W),H=!0),!a&&H&&U.unshift(`const ${S} = ${g.indices}(${r.join(",")});`,`const ${$} = ${g.indices}(${B.computeStrides(r).join(",")});`),U.join(`
`)},type:g,offsetToIndices:I,indicesToOffset:A,broadcastedIndicesToOffset:Q,indices:v,indicesGet:D,indicesSet:L,set:(...U)=>{if(U.length!==o+1)throw new Error(`indices length must be ${o}`);let H=U[o];if(typeof H!="string")throw new Error("value must be string");let F=U.slice(0,o).map(_).join(",");return o===0?J("0u",H):o===1?J(F[0],H):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${F}, ${H})`)},setByOffset:J,setByIndices:(U,H)=>o<2?J(U,H):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${H});`),get:P,getByOffset:O,getByIndices:se,usage:i,name:e,strides:$,shape:S,rank:o}},N=(e,t,r,i=1)=>rr(e,t,r,"input",i),j=(e,t,r,i=1)=>rr(e,t,r,"output",i),Ns=(e,t,r)=>rr(e,t,r,"atomicOutput",1),Hi=(e,t,r,i=1)=>rr(e,t,r,"internal",i),Ds=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=jt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${a}) {
    ${o}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Ms=(e,t)=>new Ds(e,t)}),Us,Fi,Ps,Ls,qs,Ws,Pe,Vs,Gs,ht=M(()=>{"use strict";ee(),re(),$e(),ie(),Us=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Fi=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Ps=(e,t)=>B.sortBasedOnPerm(e,Fi(e.length,t)),Ls=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)n+=`a[${e[a]}]=i[${a}];`;return n+="return a;}"},qs=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},Ws=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Pe=(e,t)=>{let r=e.dataType,i=e.dims.length,n=Fi(i,t),a=Ps(e.dims,n),o=e.dims,u=a,l=i<2||Ws(n,e.dims),p;if(l)return p=y=>{let x=N("input",r,o,4),S=j("output",r,u,4);return`
  ${y.registerUniform("output_size","u32").declareVariables(x,S)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(y/4)}]}},getShaderSource:p};let{newShape:f,newPerm:m}=qs(e.dims,n),g=B.areEqual(m,[2,3,1]),_=B.areEqual(m,[3,1,2]);if(f.length===2||g||_){o=g?[f[0],f[1]*f[2]]:_?[f[0]*f[1],f[2]]:f,u=[o[1],o[0]];let y=16;return p=x=>{let S=N("a",r,o.length),$=j("output",r,u.length);return`
  ${x.registerUniform("output_size","u32").declareVariables(S,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${y+1}>, ${y}>;
  ${x.mainStart([y,y,1])}
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
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let x=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/y),y:Math.ceil(u[0]/y)},programUniforms:[{type:12,data:x},...Z(o,u)]}},getShaderSource:p}}return p=y=>{let x=N("a",r,o.length),S=j("output",r,u.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(x,S)}

  ${Ls(n,i,x,S)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",x.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Z(o,u)]}},getShaderSource:p}},Vs=(e,t)=>{Us(e.inputs,t.perm),e.compute(Pe(e.inputs[0],t.perm))},Gs=e=>he({perm:e.perm})}),Hs,Fs,js,Ks,Zs,Qs,Xs,Ys,Js,eo,He,to,ro,io,no,ao,so,oo,uo,lo,po,Im=M(()=>{"use strict";ee(),re(),ie(),Ki(),ht(),Hs={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Fs={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},js={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Ks={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Zs=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},Qs=(e,t)=>{let r=[],i=e.length;for(let a=0;a<i;a++)t.indexOf(a)===-1&&r.push(e[a]);let n=t.map(a=>e[a]);return[r,n]},Xs=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?i.push(e[n++]):i.push(1);return i},Ys=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Js=(e,t)=>{let r=[];if(!Ys(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},eo=(e,t,r,i,n,a,o)=>{let u=r[0].dims,l=B.size(a),p=B.size(o),f=N("_A",r[0].dataType,u),m=j("output",n,a),g=64;l===1&&(g=256);let _=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,y=x=>`
        ${x.registerUniform("reduceSize","u32").declareVariables(f,m)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${x.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${js[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${Hs[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Fs[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${i==="mean"?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${Ks[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},He=(e,t,r,i)=>{let n=e.inputs.length===1?r:ji(e.inputs,r),a=n.axes;a.length===0&&!n.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((_,y)=>y));let o=B.normalizeAxes(a,e.inputs[0].dims.length),u=o,l=e.inputs[0],p=Js(u,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Pe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],u=Zs(u.length,l.dims.length));let[f,m]=Qs(l.dims,u),g=f;n.keepDims&&(g=Xs(f,o)),e.compute(eo(t,n.cacheKey,[l],i,e.inputs[0].dataType,g,m),{inputs:[l]})},to=(e,t)=>{He(e,"ReduceMeanShared",t,"mean")},ro=(e,t)=>{He(e,"ReduceL1Shared",t,"l1")},io=(e,t)=>{He(e,"ReduceL2Shared",t,"l2")},no=(e,t)=>{He(e,"ReduceLogSumExpShared",t,"logSumExp")},ao=(e,t)=>{He(e,"ReduceMaxShared",t,"max")},so=(e,t)=>{He(e,"ReduceMinShared",t,"min")},oo=(e,t)=>{He(e,"ReduceProdShared",t,"prod")},uo=(e,t)=>{He(e,"ReduceSumShared",t,"sum")},lo=(e,t)=>{He(e,"ReduceSumSquareShared",t,"sumSquare")},po=(e,t)=>{He(e,"ReduceLogSumShared",t,"logSum")}}),Fe,co,Or,ji,je,fo,ho,mo,go,yo,_o,wo,$o,bo,vo,Ke,xo,So,ko,To,Io,Eo,Co,zo,Ao,Oo,Ki=M(()=>{"use strict";ee(),re(),$e(),ie(),Im(),Fe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},co=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Or=(e,t,r,i,n,a,o=!1,u=!1)=>{let l=[],p=r[0].dims,f=p.length,m=B.normalizeAxes(n,f),g=!u&&m.length===0;p.forEach((x,S)=>{g||m.indexOf(S)>=0?o&&l.push(1):l.push(x)});let _=l.length,y=B.size(l);return{name:e,shaderCache:t,getShaderSource:x=>{let S=[],$=N("_A",r[0].dataType,f),w=j("output",a,_),T=i($,w,m),I=T[2];for(let E=0,C=0;E<f;E++)g||m.indexOf(E)>=0?(o&&C++,I=`for(var j${E}: u32 = 0; j${E} < ${p[E]}; j${E}++) {
                  ${T[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${$.indicesSet("input_indices",E,`j${E}`)}
                  ${I}
                }`):(S.push(`${$.indicesSet("input_indices",E,w.indicesGet("output_indices",C))};`),C++);return`

        ${x.registerUniform("output_size","u32").declareVariables($,w)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Z(p,l)]})}},ji=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),he({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},je=(e,t,r,i)=>{let n=e.inputs,a=n.length===1?r:ji(n,r);e.compute(Or(t,{hint:a.cacheKey,inputDependencies:["rank"]},[n[0]],a.noopWithEmptyAxes&&a.axes.length===0?co:i,a.axes,n[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},fo=(e,t)=>{Fe(e.inputs),je(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},ho=(e,t)=>{Fe(e.inputs),je(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},mo=(e,t)=>{Fe(e.inputs),je(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},go=(e,t)=>{Fe(e.inputs),je(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},yo=(e,t)=>{Fe(e.inputs),je(e,"ReduceMax",t,(r,i,n)=>{let a=[];for(let o=0;o<r.rank;o++)(n.indexOf(o)>=0||n.length===0)&&a.push(r.indicesSet("input_indices",o,0));return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},_o=(e,t)=>{Fe(e.inputs),je(e,"ReduceMean",t,(r,i,n)=>{let a=1;for(let o=0;o<r.rank;o++)(n.indexOf(o)>=0||n.length===0)&&(a*=e.inputs[0].dims[o]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${a});`]})},wo=(e,t)=>{Fe(e.inputs),je(e,"ReduceMin",t,(r,i,n)=>{let a=[];for(let o=0;o<r.rank;o++)(n.indexOf(o)>=0||n.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},$o=(e,t)=>{Fe(e.inputs),je(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},bo=(e,t)=>{Fe(e.inputs),je(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},vo=(e,t)=>{Fe(e.inputs),je(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Ke=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?i*=e[a]:n*=e[a];return n<32&&i>1024},xo=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_o(e,t):to(e,t)},So=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ho(e,t):ro(e,t)},ko=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mo(e,t):io(e,t)},To=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?go(e,t):no(e,t)},Io=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yo(e,t):ao(e,t)},Eo=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wo(e,t):so(e,t)},Co=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$o(e,t):oo(e,t)},zo=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bo(e,t):uo(e,t)},Ao=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vo(e,t):lo(e,t)},Oo=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fo(e,t):po(e,t)}}),Zi,Bo,Ro,Qi,Em=M(()=>{"use strict";ee(),$e(),Ki(),Zi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Bo=(e,t)=>{Zi(e.inputs);let r=(i,n,a)=>{let o=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&o.push(`input_indices[${u}] = 0;`);return[`${o.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Or("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ro=(e,t)=>{Zi(e.inputs);let r=(i,n,a)=>{let o=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&o.push(`input_indices[${u}] = 0;`);return[`${o.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Or("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Qi=e=>he(e)}),No,Br,Do,Mo,Uo,ir,Po,Lo,Xi=M(()=>{"use strict";ee(),re(),Li(),ie(),No=(e,t)=>{let r=e[0],i=e[1],n=e[2],a=e[3],o=e[4],u=e[5];if(o&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],p=r.dims[1],f=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let m=n.dims[0]/3,g=m,_=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");m=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let y=p;if(m!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==m+g+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let x=0;if(o){if(g!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(o.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(o.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(o.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(x=o.dims[3])}let S=y+x,$=-1,w=0;if(a)throw new Error("Mask not supported");if(o)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:x,kvSequenceLength:y,totalSequenceLength:S,maxSequenceLength:$,inputHiddenSize:f,hiddenSize:m,vHiddenSize:_,headSize:Math.floor(m/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Br=(e,t,r)=>t&&e?`
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
    `,Do=(e,t,r,i,n,a,o,u)=>{let l=be(o?1:a),p=64,f=a/l;f<p&&(p=32);let m=Math.ceil(a/l/p),g=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:f},{type:12,data:m}],_=Ee(e.dataType,l),y=Ce(1,l),x=["type"];o&&x.push("type"),u&&x.push("type");let S=$=>{let w=j("x",e.dataType,e.dims,l),T=[w],I=o?N("seq_lens",o.dataType,o.dims):void 0;I&&T.push(I);let E=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;E&&T.push(E);let C=Ce(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${$.registerUniforms(A).declareVariables(...T)}
  ${$.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Br(I,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
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
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${l}`,inputDependencies:x},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:g})}},Mo=(e,t,r,i,n,a,o,u,l)=>{let p=o+a.kvSequenceLength,f=[a.batchSize,a.numHeads,a.sequenceLength,p],m=e>1&&i,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=m?[a.batchSize,g,p,a.headSize]:void 0,y=a.nReps?a.nReps:1,x=a.scale===0?1/Math.sqrt(a.headSize):a.scale,S=be(a.headSize),$=a.headSize/S,w=12,T={x:Math.ceil(p/w),y:Math.ceil(a.sequenceLength/w),z:a.batchSize*a.numHeads},I=[{type:12,data:a.sequenceLength},{type:12,data:$},{type:12,data:p},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:x},{type:12,data:o},{type:12,data:a.kvSequenceLength},{type:12,data:y}],E=m&&i&&B.size(i.dims)>0,C=["type","type"];E&&C.push("type"),n&&C.push("type"),u&&C.push("type"),l&&C.push("type");let A=[{dims:f,dataType:t.dataType,gpuDataType:0}];m&&A.push({dims:_,dataType:t.dataType,gpuDataType:0});let v=D=>{let L=N("q",t.dataType,t.dims,S),X=N("key",r.dataType,r.dims,S),Q=[L,X];if(E){let ne=N("past_key",i.dataType,i.dims,S);Q.push(ne)}n&&Q.push(N("attention_bias",n.dataType,n.dims));let J=u?N("seq_lens",u.dataType,u.dims):void 0;J&&Q.push(J);let O=l?N("total_sequence_length_input",l.dataType,l.dims):void 0;O&&Q.push(O);let W=j("output",t.dataType,f),Y=[W];m&&Y.push(j("present_key",t.dataType,_,S));let P=Ce(1,S),se=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${L.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${L.type.storage}, ${w*w}>;
  ${D.registerUniforms(se).declareVariables(...Q,...Y)}
  ${D.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Br(J,O,!0)}
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
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${n!==void 0};${i!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:A,dispatchGroup:T,programUniforms:I}),getShaderSource:v}},Uo=(e,t,r,i,n,a,o=void 0,u=void 0)=>{let l=a+n.kvSequenceLength,p=n.nReps?n.nReps:1,f=n.vHiddenSize*p,m=e>1&&i,g=n.kvNumHeads?n.kvNumHeads:n.numHeads,_=m?[n.batchSize,g,l,n.headSize]:void 0,y=[n.batchSize,n.sequenceLength,f],x=12,S={x:Math.ceil(n.vHeadSize/x),y:Math.ceil(n.sequenceLength/x),z:n.batchSize*n.numHeads},$=[{type:12,data:n.sequenceLength},{type:12,data:l},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:f},{type:12,data:a},{type:12,data:n.kvSequenceLength},{type:12,data:p}],w=m&&i&&B.size(i.dims)>0,T=["type","type"];w&&T.push("type"),o&&T.push("type"),u&&T.push("type");let I=[{dims:y,dataType:t.dataType,gpuDataType:0}];m&&I.push({dims:_,dataType:t.dataType,gpuDataType:0});let E=C=>{let A=N("probs",t.dataType,t.dims),v=N("v",r.dataType,r.dims),D=[A,v];w&&D.push(N("past_value",i.dataType,i.dims));let L=o?N("seq_lens",o.dataType,o.dims):void 0;o&&D.push(L);let X=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;u&&D.push(X);let Q=[j("output",t.dataType,y)];m&&Q.push(j("present_value",t.dataType,_));let J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;
  var<workgroup> tileQ: array<${A.type.value}, ${x*x}>;
  var<workgroup> tileV: array<${A.type.value}, ${x*x}>;
  ${C.registerUniforms(J).declareVariables(...D,...Q)}
  ${C.mainStart([x,x,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Br(L,X,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&m?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${m?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${A.type.storage}(0);
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:I,dispatchGroup:S,programUniforms:$}),getShaderSource:E}},ir=(e,t,r,i,n,a,o,u,l,p,f=void 0,m=void 0)=>{let g=Math.min(e.outputCount,1+(o?1:0)+(u?1:0)),_=g>1?o:void 0,y=g>1?u:void 0,x=g>1?p.pastSequenceLength:0,S=x+p.kvSequenceLength,$=l&&B.size(l.dims)>0?l:void 0,w=[t,r];_&&B.size(_.dims)>0&&w.push(_),$&&w.push($),f&&w.push(f),m&&w.push(m);let T=e.compute(Mo(g,t,r,_,$,p,x,f,m),{inputs:w,outputs:g>1?[-1,1]:[-1]})[0];e.compute(Do(T,p.batchSize,p.numHeads,x,p.sequenceLength,S,f,m),{inputs:f&&m?[T,f,m]:[T],outputs:[]});let I=[T,i];y&&B.size(y.dims)>0&&I.push(y),f&&I.push(f),m&&I.push(m),e.compute(Uo(g,T,i,y,p,x,f,m),{inputs:I,outputs:g>1?[0,2]:[0]})},Po=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,a=t.headSize,o=12,u={x:Math.ceil(t.headSize/o),y:Math.ceil(t.sequenceLength/o),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:i},{type:12,data:n},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=m=>{let g=j("output_q",l[0].dataType,r),_=j("output_k",l[0].dataType,r),y=j("output_v",l[0].dataType,r),x=N("input",l[0].dataType,l[0].dims),S=N("weight",l[1].dataType,l[1].dims),$=N("bias",l[2].dataType,l[2].dims),w=x.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${o}u;
  var<workgroup> tileInput: array<${w}, ${o*o}>;
  var<workgroup> tileWeightQ: array<${w}, ${o*o}>;
  var<workgroup> tileWeightK: array<${w}, ${o*o}>;
  var<workgroup> tileWeightV: array<${w}, ${o*o}>;
  ${m.registerUniforms(T).declareVariables(x,S,$,g,_,y)}
  ${m.mainStart([o,o,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:f},{inputs:l,outputs:[-1,-1,-1]})},Lo=(e,t)=>{let r=No(e.inputs,t),[i,n,a]=Po(e,r);return ir(e,i,n,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),qo,Wo,Vo,Go,Cm=M(()=>{"use strict";Me(),ee(),re(),$e(),ie(),qo=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,a)=>{let o=n.length;if(o!==i.length)throw new Error(`${a}: num dimensions != ${o}`);n.forEach((u,l)=>{if(u!==i[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Wo=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,a=e[0].dims,o=i?be(a[a.length-1]):1,u=n==="NHWC"&&a.length>1?o:1,l=B.size(a)/o,p=i,f=p?a.length:a,m=N("x",e[0].dataType,e[0].dims,o),g=N("scale",e[1].dataType,e[1].dims,u),_=N("bias",e[2].dataType,e[2].dims,u),y=N("inputMean",e[3].dataType,e[3].dims,u),x=N("inputVar",e[4].dataType,e[4].dims,u),S=j("y",e[0].dataType,f,o),$=()=>{let T="";if(i)T=`let cOffset = ${a.length===1?"0u":n==="NHWC"?`outputIndices[${a.length-1}] / ${o}`:"outputIndices[1]"};`;else if(n==="NCHW")T=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let I=1;I<g.rank;I++)T+=`cIndices[${I}] = outputIndices[${I}];`;T+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return T},w=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(m,g,_,y,x,S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${o}`)};
    ${$()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${x.getByOffset("cOffset")};
    let x = ${m.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${o}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...Z(a)]:[{type:12,data:l}]})}},Vo=e=>he(e),Go=(e,t)=>{let{inputs:r,outputCount:i}=e,n=Vo({...t,outputCount:i});if(we.webgpu.validateInputContent&&qo(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Wo(r,n))}}),Ho,Fo,jo,zm=M(()=>{"use strict";re(),ie(),Ho=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Fo=e=>{let t=e[0].dims,r=e[0].dims[2],i=B.size(t)/4,n=e[0].dataType,a=N("input",n,t,4),o=N("bias",n,[r],4),u=N("residual",n,t,4),l=j("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(a,o,u,l)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},jo=e=>{Ho(e.inputs),e.compute(Fo(e.inputs))}}),Ko,ce,Zo,Qo,Xo,Yo,Jo,eu,tu,ru,iu,nu,au,su,ou,uu,nr,lu,Rr,du,pu,cu,fu,hu,mu,gu,yu,_u,wu,$u,bu,vu,xu,Su,ku,Tu,Yi,Iu,Ji,en,Eu,Cu,zu,Au,Ou,Bu,tn=M(()=>{"use strict";ee(),re(),$e(),ie(),Ko=(e,t,r,i,n,a,o)=>{let u=Math.ceil(t/4),l="";typeof n=="string"?l=`${n}(a)`:l=n("a");let p=N("inputData",r,[u],4),f=j("outputData",i,[u],4),m=[{name:"vec_size",type:"u32"}];return o&&m.push(...o),`
      ${e.registerUniforms(m).declareVariables(p,f)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",l)}
  }`},ce=(e,t,r,i,n,a=e.dataType,o,u)=>{let l=[{type:12,data:Math.ceil(B.size(e.dims)/4)}];return o&&l.push(...o),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:p=>Ko(p,B.size(e.dims),e.dataType,a,r,i,u),getRunData:p=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(B.size(p[0].dims)/64/4)},programUniforms:l})}},Zo=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},Qo=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},Xo=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},Yo=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},Jo=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},eu=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},tu=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},ru=e=>he(e),iu=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},nu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return he({min:t,max:r})},au=(e,t)=>{let r=t||nu(e.inputs),i=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},su=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},ou=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},uu=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},nr=e=>he(e),lu=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Rr=(e="f32")=>`
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
}`,du=e=>{let t=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Rr(t)))},pu=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},cu=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},fu=e=>{let t=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Rr(t)))},hu=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},mu=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},gu=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},yu=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},_u=e=>{let t=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},wu=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},$u=e=>he(e),bu=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},vu=e=>{let t=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},xu=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},Su=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},ku=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},Tu=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},Yi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Iu=e=>{e.compute(ce(e.inputs[0],"Tanh",Yi))},Ji=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Yi("v")};
}
`,en=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Eu=e=>{let t=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",en,Ji(t),void 0,e.inputs[0].dataType))},Cu=(e,t)=>{let r=Ce(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},zu=e=>{e.compute(ce(e.inputs[0],"Log","log"))},Au=(e,t)=>`
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
`,Ou=e=>`quick_gelu_impl(${e})`,Bu=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",Ou,Au(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Ru,Nu,Du,Am=M(()=>{"use strict";re(),ie(),tn(),Ru=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Nu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=N("input",e[0].dataType,e[0].dims,4),i=N("bias",e[0].dataType,[e[0].dims[2]],4),n=j("output",e[0].dataType,t,4),a=B.size(t)/4,o=Ee(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,n)}

  ${Rr(o)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Du=e=>{Ru(e.inputs),e.compute(Nu(e.inputs))}}),Mu,Uu,Ze,Pu,Lu,qu,Wu,Vu,Gu,Hu,Fu,ju,Ku,Om=M(()=>{"use strict";ee(),re(),ie(),Mu=(e,t,r,i,n,a,o,u,l,p,f,m)=>{let g,_;typeof u=="string"?g=_=(w,T)=>`${u}((${w}),(${T}))`:typeof u=="function"?g=_=u:(g=u.scalar,_=u.vector);let y=j("outputData",f,i.length,4),x=N("aData",l,t.length,4),S=N("bData",p,r.length,4),$;if(n)if(a){let w=B.size(t)===1,T=B.size(r)===1,I=t.length>0&&t[t.length-1]%4===0,E=r.length>0&&r[r.length-1]%4===0;w||T?$=y.setByOffset("global_idx",_(w?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"),T?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):$=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${x.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",_(o||I?x.getByOffset("offsetA / 4u"):`${x.type.value}(${x.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||E?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=y.setByOffset("global_idx",_(x.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(T,I,E="")=>{let C=`aData[indexA${I}][componentA${I}]`,A=`bData[indexB${I}][componentB${I}]`;return`
            let outputIndices${I} = ${y.offsetToIndices(`global_idx * 4u + ${I}u`)};
            let offsetA${I} = ${x.broadcastedIndicesToOffset(`outputIndices${I}`,y)};
            let offsetB${I} = ${S.broadcastedIndicesToOffset(`outputIndices${I}`,y)};
            let indexA${I} = offsetA${I} / 4u;
            let indexB${I} = offsetB${I} / 4u;
            let componentA${I} = offsetA${I} % 4u;
            let componentB${I} = offsetB${I} % 4u;
            ${T}[${I}] = ${E}(${g(C,A)});
          `};f===9?$=`
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
        ${e.registerUniform("vec_size","u32").declareVariables(x,S,y)}

        ${m??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Uu=(e,t,r,i,n,a,o=r.dataType)=>{let u=r.dims.map(Number),l=i.dims.map(Number),p=!B.areEqual(u,l),f=u,m=B.size(u),g=!1,_=!1,y=[p];if(p){let x=Ft.calcShape(u,l,!1);if(!x)throw new Error("Can't perform binary op on the given tensors");f=x.slice(),m=B.size(f);let S=B.size(u)===1,$=B.size(l)===1,w=u.length>0&&u[u.length-1]%4===0,T=l.length>0&&l[l.length-1]%4===0;y.push(S),y.push($),y.push(w),y.push(T);let I=1;for(let E=1;E<f.length;E++){let C=u[u.length-E],A=l[l.length-E];if(C===A)I*=C;else break}I%4===0?(_=!0,g=!0):(S||$||w||T)&&(g=!0)}else g=!0;return y.push(g),{name:e,shaderCache:{hint:t+y.map(x=>x.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:x=>Mu(x,u,l,f,g,p,_,n,r.dataType,i.dataType,o,a),getRunData:()=>({outputs:[{dims:f,dataType:o}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(B.size(f)/4)},...Z(u,l,f)]})}},Ze=(e,t,r,i,n,a)=>{e.compute(Uu(t,n??"",e.inputs[0],e.inputs[1],r,i,a))},Pu=e=>{Ze(e,"Add",(t,r)=>`${t}+${r}`)},Lu=e=>{Ze(e,"Div",(t,r)=>`${t}/${r}`)},qu=e=>{Ze(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Wu=e=>{Ze(e,"Mul",(t,r)=>`${t}*${r}`)},Vu=e=>{let t=N("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ze(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
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
      `)},Gu=e=>{Ze(e,"Sub",(t,r)=>`${t}-${r}`)},Hu=e=>{Ze(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Fu=e=>{Ze(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},ju=e=>{Ze(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Ku=e=>{Ze(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Zu,Qu,Xu,Yu,Bm=M(()=>{"use strict";ee(),re(),$e(),ie(),Zu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,a=i.dims.length;e.forEach((o,u)=>{if(u!==r){if(o.dataType!==n)throw new Error("input tensors should be one type");if(o.dims.length!==a)throw new Error("input tensors should have the same shape");o.dims.forEach((l,p)=>{if(p!==t&&l!==i.dims[p])throw new Error("non concat dimensions must match")})}})},Qu=(e,t,r,i,n=0)=>{let a=e.reduce(($,w)=>$+B.size(w.dims),0),o=new Array(e.length),u=new Array(e.length),l=new Array(e.length),p=0,f=n,m=[],g=[],_=[{type:12,data:a}];for(let $=0;$<e.length;++$)o[$]=p,u[$]=f,p+=B.size(e[$].dims),f+=e[$].dims[t],g.push(e[$].dims.length),l[$]=N(`input${$}`,i,g[$]),m.push("rank"),_.push({type:12,data:o[$]}),_.push({type:12,data:u[$]});for(let $=0;$<e.length;++$)_.push(...Z(e[$].dims));_.push(...Z(r));let y=j("output",i,r.length),x=l.map(($,w)=>{let T=`
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
    ${x}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:_}),getShaderSource:S}},Xu=(e,t)=>{let r=e.inputs,i=r[0].dims,n=B.normalizeAxis(t.axis,i.length);Zu(r,n);let a=i.slice();a[n]=r.reduce((p,f)=>p+(f.dims.length>n?f.dims[n]:0),0);let o=r.filter(p=>B.size(p.dims)>0);if(o.length===0){e.output(0,a);return}let u=e.deviceLimits.maxStorageBuffersPerShaderStage-1,l=0;for(let p=0;p<o.length;p+=u){let f=o.slice(p,p+u);e.compute(Qu(f,n,a,r[0].dataType,l),{inputs:f,outputs:[0]}),l+=f.reduce((m,g)=>m+g.dims[n],0)}},Yu=e=>he({axis:e.axis})}),zt,At,Ot,rn,Bt=M(()=>{"use strict";ee(),re(),zt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},At=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Ot=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},rn=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[$s,bs];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Ae,Ju,nn=M(()=>{"use strict";Ae=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Ju=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),el,Rm=M(()=>{"use strict";el=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),ar,an,sn=M(()=>{"use strict";ee(),re(),ie(),Bt(),ar=(e,t,r,i,n)=>{let a=i-r;return`
      ${Array.from({length:r}).map((o,u)=>`
      if (${K(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,K(n,u+a,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},an=(e,t,r,i,n=!1,a)=>{let o=e[0].dims,u=e[1].dims,l=o[o.length-2],p=u[u.length-1],f=o[o.length-1],m=be(p),g=be(f),_=be(l),y=B.size(r)/m/_,x=e.length>2,S=i?i.slice(0,-2):r.slice(0,-2),$=[B.size(S),l,p],w=[{type:12,data:y},{type:12,data:l},{type:12,data:p},{type:12,data:f}];At(t,w),w.push(...Z(S,o,u)),x&&w.push(...Z(e[2].dims)),w.push(...Z($));let T=I=>{let E=Hi("batch_dims",e[0].dataType,S.length),C=N("a",e[0].dataType,o.length,g),A=N("b",e[1].dataType,u.length,m),v=j("output",e[0].dataType,$.length,m),D=Ee(v.type.tensor),L=zt(t,v.type.value,D),X=[C,A],Q="";if(x){let W=n?m:1;X.push(N("bias",e[2].dataType,e[2].dims.length,W)),Q=`${n?`value += bias[col / ${W}];`:`value += ${v.type.value}(bias[row + i]);`}`}let J=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Ot(t,J);let O=()=>{let W=`var a_data: ${C.type.value};`;for(let Y=0;Y<g;Y++)W+=`
              let b_data${Y} = b[(b_offset + (k + ${Y}) * uniforms.N + col) / ${m}];`;for(let Y=0;Y<_;Y++){W+=`a_data = a[(a_offset + (row + ${Y}) * uniforms.K + k) / ${g}];`;for(let P=0;P<g;P++)W+=`
            values[${Y}] = fma(${A.type.value}(a_data${g===1?"":`[${P}]`}), b_data${P}, values[${Y}]);
`}return W};return`
  ${I.registerUniforms(J).registerInternalVariables(E).declareVariables(...X,v)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${m})) * ${m};
    var index1 = global_idx / (uniforms.N / ${m});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${ar("a_indices",C,C.rank-2,E.rank,"batch_indices")}
    ${C.indicesSet("a_indices",C.rank-2,0)}
    ${C.indicesSet("a_indices",C.rank-1,0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${ar("b_indices",A,A.rank-2,E.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${v.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${O()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${Q}
      ${L}
      let cur_indices = ${v.type.indices}(batch, row + i, col);
      let offset = ${v.indicesToOffset("cur_indices")};
      ${v.setByOffset(`offset / ${m}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${m};${g};${_};${n}`,inputDependencies:x?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:w}),getShaderSource:T}}}),tl,rl,on,un,il,ln,nl,Nr,dn=M(()=>{"use strict";ee(),re(),ie(),Bt(),sn(),nn(),tl=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,rl=(e,t)=>e?`
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
        }`,on=(e,t,r="f32",i,n=!1,a=32,o=!1,u=32)=>{let l=t[1]*e[1],p=t[0]*e[0],f=n?l:a,m=n?a:l,g=f/t[0],_=a/t[1];if(!((n&&g===4&&e[1]===4||!n&&(g===3||g===4))&&f%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${f/g}>, ${m}>;
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
  let batch = ${o?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${o?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${tl(n,i)}
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

          ${rl(n,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},un=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,il=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",ln=(e,t,r="f32",i,n=!1,a=32,o=!1,u=32,l=!1)=>{let p=e[1]*t[1],f=e[0]*t[0],m=n?p:a,g=n?a:p;if(!(g%t[1]===0&&m%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let _=g/t[1],y=m/t[0],x=a/t[1],S=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
          ${un(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
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
let tileRowB = i32(localId.y) * ${x};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${un(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${x}; innerRow = innerRow + 1) {
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
      ${il(n)}
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
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`},nl=(e,t,r,i,n=!1)=>{let[a,o,u,l]=i,p=Ee(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ae(e,p)} {
      var value = ${Ae(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${ar("aIndices",o,o.rank-2,a.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ae(e,p)} {
      var value = ${Ae(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${ar("bIndices",u,u.rank-2,a.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ae(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${Ae(e,p)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Nr=(e,t,r,i,n=!1,a)=>{let o=e[0].dims,u=e[1].dims,l=o.slice(0,-2),p=u.slice(0,-2),f=i?i.slice(0,-2):r.slice(0,-2),m=B.size(f),g=o[o.length-2],_=o[o.length-1],y=u[u.length-1],x=_%4===0&&y%4===0,S=g<=8?[4,1,1]:[4,4,1],$=[8,8,1],w=[Math.ceil(y/$[0]/S[0]),Math.ceil(g/$[1]/S[1]),Math.ceil(m/$[2]/S[2])],T=x?4:1,I=[...l,g,_/T],E=I.length,C=[...p,_,y/T],A=C.length,v=[m,g,y/T],D=[{type:6,data:g},{type:6,data:y},{type:6,data:_}];At(t,D),D.push(...Z(f,I,C));let L=["rank","rank"],X=e.length>2;X&&(D.push(...Z(e[2].dims)),L.push("rank")),D.push(...Z(v));let Q=J=>{let O=f.length,W=Hi("batchDims",e[0].dataType,O,1),Y=Ee(e[0].dataType),P=N("a",e[0].dataType,E,T),se=N("b",e[1].dataType,A,T),ne=j("result",e[0].dataType,v.length,T),te=[P,se];if(X){let Se=n?T:1;te.push(N("bias",e[2].dataType,e[2].dims.length,Se))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Ot(t,U);let H=Ee(ne.type.tensor),F=zt(t,ne.type.value,H),V=nl(T,X,F,[W,P,se,ne],n);return`
  ${J.registerUniforms(U).registerInternalVariables(W).declareVariables(...te,ne)}
  ${V}
  ${x?on(S,$,Y,W):ln(S,$,Y,W)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${x};${n}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:D}),getShaderSource:Q}}}),al,sl,Nm=M(()=>{"use strict";ee(),ut(),ie(),Bt(),nn(),Rm(),dn(),al=(e,t,r,i,n=!1,a,o=4,u=4,l=4,p="f32")=>{let f=D=>{switch(D){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},m=D=>{switch(D){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},g=e?`
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
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",x=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",$=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Ae(o,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${x}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(o)}
    }
    return resData;`,T=e?t&&i?`
    let col = colIn * ${o};
    ${w}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Ae(o,p)}(0.0);`:i&&r?`
    let col = colIn * ${o};
    ${w}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Ae(o,p)}(0.0);`,I=e?i&&r?m(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m(u)}
    }
    return ${Ae(u,p)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${m(u)}
    }
    return ${Ae(u,p)}(0.0);`,E=Ae(l,p),C=Ae(e?o:u,p),A=Ae(e?u:o,p),v=zt(a,E,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?T:I}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?I:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Ju(n)}
      ${v}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},sl=(e,t,r,i,n,a,o,u,l)=>{let p=t.format==="NHWC",f=p?e[0].dims[3]:e[0].dims[1],m=r[0],g=p?r[2]:r[3],_=p?r[1]:r[2],y=p?r[3]:r[1],x=p&&(f%4===0||f%3===0)&&y%4===0,S=p?y:g*_,$=p?g*_:y,w=[8,8,1],T=i<=8?[4,1,1]:[4,4,1],I=[Math.ceil(S/w[0]/T[0]),Math.ceil($/w[1]/T[1]),Math.ceil(m/w[2]/T[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${I}`);let E=x?p&&f%4!==0?3:4:1,C=w[1]*T[1],A=w[0]*T[0],v=Math.max(w[0]*E,w[1]),D=i%C===0,L=n%A===0,X=a%v===0,Q=x?[E,4,4]:[1,1,1],J=[{type:6,data:i},{type:6,data:n},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];At(t,J),J.push(...Z(e[0].dims,e[1].dims));let O=["rank","rank"];o&&(J.push(...Z(e[2].dims)),O.push("rank")),J.push(...Z(r));let W=Y=>{let P=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Ot(t,P);let se=x?4:1,ne=Ee(e[0].dataType),te=`
      fn setOutputAtIndex(flatIndex : i32, value : ${x?`vec4<${ne}>`:ne}) {
        result[flatIndex] = ${x?`vec4<${ne}>`:ne}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${x?`vec4<${ne}>`:ne}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${x?"/ 4":""}, value);
      }`,U=N("x",e[0].dataType,e[0].dims.length,E===3?1:E),H=N("w",e[1].dataType,e[1].dims.length,se),F=[U,H],V=j("result",e[0].dataType,r.length,se);if(o){let Se=N("bias",e[2].dataType,e[2].dims.length,se);F.push(Se),te+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${x?`vec4<${ne}>`:ne} {
          return bias[coords.${p?"w":"y"}${x?"/ 4":""}];
        }`}return`
        ${el("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Y.registerUniforms(P).declareVariables(...F,V)}
        ${te}
        ${al(p,D,L,X,o,t,Q[0],Q[1],Q[2],ne)}
        ${x?on(T,w,ne,void 0,!p,v):ln(T,w,ne,void 0,!p,v,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${x};${D};${L};${X};${C};${A};${v}`,inputDependencies:O},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:I[0],y:I[1],z:I[2]},programUniforms:J}),getShaderSource:W}}}),ol,pn,sr,ul,cn,ll,dl,pl,Dm=M(()=>{"use strict";ee(),ut(),re(),ie(),Bt(),nn(),ol=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},pn=e=>typeof e=="number"?[e,e,e]:e,sr=(e,t)=>t<=1?e:e+(e-1)*(t-1),ul=(e,t,r,i=1)=>{let n=sr(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},cn=(e,t,r,i,n)=>{n==null&&(n=ul(e,t[0],i[0]));let a=[0,0,0,r];for(let o=0;o<3;o++)e[o]+2*n>=t[o]&&(a[o]=Math.trunc((e[o]-t[o]+2*n)/i[o]+1));return a},ll=(e,t,r,i,n,a,o,u,l,p)=>{let f,m,g,_;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=cn([t,r,i,1],[u,l,p],1,[n,a,o],e);m=y[0],g=y[1],_=y[2]}else if(Array.isArray(e)){if(!e.every((x,S,$)=>x===$[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=cn([t,r,i,1],[u,l,p],1,[n,a,o],e[0]);m=y[0],g=y[1],_=y[2]}else if(e==="SAME_UPPER"){m=Math.ceil(t/n),g=Math.ceil(r/a),_=Math.ceil(i/o);let y=(m-1)*n+u-t,x=(g-1)*a+l-r,S=(_-1)*o+p-i,$=Math.floor(y/2),w=y-$,T=Math.floor(x/2),I=x-T,E=Math.floor(S/2),C=S-E;f={top:T,bottom:I,left:E,right:C,front:$,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:m,outHeight:g,outWidth:_}},dl=(e,t,r,i,n,a=!1,o="channelsLast")=>{let u,l,p,f,m;if(o==="channelsLast")[u,l,p,f,m]=e;else if(o==="channelsFirst")[u,m,l,p,f]=e;else throw new Error(`Unknown dataFormat ${o}`);let[g,,_,y,x]=t,[S,$,w]=pn(r),[T,I,E]=pn(i),C=sr(_,T),A=sr(y,I),v=sr(x,E),{padInfo:D,outDepth:L,outHeight:X,outWidth:Q}=ll(n,l,p,f,S,$,w,C,A,v),J=a?g*m:g,O=[0,0,0,0,0];return o==="channelsFirst"?O=[u,J,L,X,Q]:o==="channelsLast"&&(O=[u,L,X,Q,J]),{batchSize:u,dataFormat:o,inDepth:l,inHeight:p,inWidth:f,inChannels:m,outDepth:L,outHeight:X,outWidth:Q,outChannels:J,padInfo:D,strideDepth:S,strideHeight:$,strideWidth:w,filterDepth:_,filterHeight:y,filterWidth:x,effectiveFilterDepth:C,effectiveFilterHeight:A,effectiveFilterWidth:v,dilationDepth:T,dilationHeight:I,dilationWidth:E,inShape:e,outShape:O,filterShape:t}},pl=(e,t,r,i,n,a)=>{let o=a==="channelsLast",u=o?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],f={x:r.map((w,T)=>T)},m=[Math.ceil(ol(f.x.map(w=>r[w]))/p[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${m}`);let g=l?o&&u%4!==0?3:4:1,_=B.size(r),y=[{type:12,data:_},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];At(t,y),y.push(...Z(e[0].dims,e[1].dims));let x=["rank","rank"],S=e.length===3;S&&(y.push(...Z(e[2].dims)),x.push("rank")),y.push(...Z(r));let $=w=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Ot(t,T);let I=l?4:1,E=Ee(e[0].dataType),C=N("x",e[0].dataType,e[0].dims.length,g===3?1:g),A=N("W",e[1].dataType,e[1].dims.length,I),v=[C,A],D=j("result",e[0].dataType,r.length,I),L="";if(S){let J=N("bias",e[2].dataType,e[2].dims.length,I);v.push(J),L+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${E}>`:E} {
          return bias[${o?K("coords",4,5):K("coords",1,5)}${l?"/ 4":""}];
        }`}let X=Ae(g,E),Q=zt(t,X,E);return`
            ${L}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${E} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${E} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
          ${w.registerUniforms(T).declareVariables(...v,D)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${D.offsetToIndices("global_idx")};
              let batch = ${K("coords",0,C.rank)};
              let d2 = ${o?K("coords",C.rank-1,C.rank):K("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${o?K("coords",1,C.rank):K("coords",2,C.rank)},
              ${o?K("coords",2,C.rank):K("coords",3,C.rank)},
              ${o?K("coords",3,C.rank):K("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?K("uniforms.x_shape",1,C.rank):K("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${o?K("uniforms.x_shape",2,C.rank):K("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${o?K("uniforms.x_shape",3,C.rank):K("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${o?K("uniforms.x_shape",4,C.rank):K("uniforms.x_shape",1,C.rank)};
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
                      ${o?`let xValues = vec4<${E}>(
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
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<${E}>(
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
                      ${o?`let xValues = vec3<${E}>(
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
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${o};${g};${S}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:m[0],y:m[1],z:m[2]},programUniforms:y}),getShaderSource:$}}}),cl,fl,Mm=M(()=>{"use strict";ee(),re(),ie(),Bt(),cl=(e,t,r,i)=>{let n=e.length>2,a=n?"value += b[output_channel];":"",o=e[0].dims,u=e[1].dims,l=t.format==="NHWC",p=l?r[3]:r[1],f=p/t.group,m=l&&f>=4?be(p):1,g=B.size(r)/m,_=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];At(t,_),_.push(...Z(o,[u[0],u[1],u[2],u[3]/m]));let y=n?["rank","rank","rank"]:["rank","rank"];_.push(...Z([r[0],r[1],r[2],r[3]/m]));let x=S=>{let $=j("output",e[0].dataType,r.length,m),w=Ee($.type.tensor),T=zt(t,$.type.value,w),I=N("x",e[0].dataType,o.length),E=N("w",e[1].dataType,u.length,m),C=[I,E];n&&C.push(N("b",e[2].dataType,e[2].dims,m));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Ot(t,A);let v=l?`
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
  ${S.registerUniforms(A).declareVariables(...C,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${m} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${v}
    ${a}
    ${T}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${m}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:x}},fl=(e,t,r,i)=>{let n=e.length>2,a=be(r[3]),o=be(r[2]),u=B.size(r)/a/o,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],f=[r[0],r[1],r[2],r[3]/a],m=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];At(t,m),m.push(...Z(l,p,f));let g=(o-1)*t.strides[1]+p[1],_=y=>{let x=j("output",e[0].dataType,f.length,a),S=Ee(x.type.tensor),$=zt(t,x.type.value,S),w=N("x",e[0].dataType,l.length,a),T=N("w",e[1].dataType,p.length,a),I=[w,T];n&&I.push(N("b",e[2].dataType,e[2].dims,a));let E=n?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Ot(t,C),`
  ${y.registerUniforms(C).declareVariables(...I,x)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${g}>;
    var values: array<${x.type.value}, ${o}>;
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
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${E}
      ${$}
      ${x.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${o};${g};${p[0]};${p[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:_}}}),hl,Dr,ml,Mr,fn,hn,gl,yl,mn,Um=M(()=>{"use strict";re(),Nm(),Dm(),dn(),Mm(),Bt(),sn(),ht(),hl=(e,t,r,i,n,a)=>{let o=e[0],u=e.slice(a?1:2,a?3:4),l=u.length,p=t[0],f=t.slice(2).map((g,_)=>g+(g-1)*(r[_]-1)),m=u.map((g,_)=>g+i[_]+i[_+l]).map((g,_)=>Math.floor((g-f[_]+n[_])/n[_]));return m.splice(0,0,o),m.splice(a?3:1,0,p),m},Dr=[2,3,1,0],ml=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Mr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let i=e.pads.slice();Er.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},fn=e=>{let t=rn(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,a=e.group,o=e.kernel_shape,u=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:a,kernelShape:o,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},hn=(e,t,r,i)=>{let n=r.format==="NHWC",a=hl(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let C=[t[0]];if(n){let A=e.kernelCustomData.wT??e.compute(Pe(t[1],Dr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),C.push(A)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(fl(C,r,a,i),{inputs:C}):e.compute(cl(C,r,a,i),{inputs:C});return}let o=t.length===3,u=t[0].dims[n?1:2],l=t[0].dims[n?2:3],p=t[0].dims[n?3:1],f=t[1].dims[2],m=t[1].dims[3],g=a[n?1:2],_=a[n?2:3],y=a[n?3:1],x=n&&f===u&&m===l&&r.pads[0]===0&&r.pads[1]===0;if(x||f===1&&m===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=a[0],A,v,D,L=[];if(n){let J=e.kernelCustomData.wT??e.compute(Pe(t[1],Dr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=J),x){let O=u*l*p;A=t[0].reshape([1,C,O]),v=J.reshape([1,O,y]),D=[1,C,y]}else A=t[0].reshape([C,u*l,p]),v=J.reshape([1,p,y]),D=[C,g*_,y];L.push(A),L.push(v)}else A=t[0].reshape([C,p,u*l]),v=t[1].reshape([1,y,p]),D=[C,y,g*_],L.push(v),L.push(A);o&&L.push(t[2]);let X=D[2],Q=L[0].dims[L[0].dims.length-1];X<8&&Q<8?e.compute(an(L,r,a,D,n,i),{inputs:L}):e.compute(Nr(L,r,a,D,n,i),{inputs:L});return}let S=!0,$=e.kernelCustomData.wT??e.compute(Pe(t[1],Dr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let w=[t[0],$];o&&w.push(t[2]);let T=n?g*_:y,I=n?y:g*_,E=f*m*p;e.compute(sl(w,r,a,T,I,E,o,S,i),{inputs:w})},gl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),o=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=Mr({...t,pads:n,strides:a,dilations:o,kernelShape:u},i);hn(e,i,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},yl=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=Mr(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,o=dl(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,i);e.compute(pl(t,n,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],i))},mn=(e,t)=>{if(ml(e.inputs,t),e.inputs[0].dims.length===3)gl(e,t);else if(e.inputs[0].dims.length===5)yl(e,e.inputs,t);else{let r=Mr(t,e.inputs);hn(e,e.inputs,r)}}}),_l,Pm=M(()=>{"use strict";ee(),ut(),re(),ie(),_l=(e,t,r)=>{let i=e.length>2,n=t.outputShape,a=t.format==="NHWC",o=t.group,u=e[1].dims,l=u[2]/o,p=u[3],f=a?be(l):1,m=a&&p===1&&l>=4,g=m?Math.floor(l/4)*4:Math.floor(l/f)*f,_=l-g,y=a?be(p):1,x=a?p===1?f:y:1,S=B.size(n)/y,$=[Math.ceil(S/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let w=["rank","rank"],T=[t.strides[0],t.strides[1]],I=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],E=[t.dilations[0],t.dilations[1]],C=[I[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),I[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],A=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],v=[{type:12,data:S},{type:12,data:T},{type:12,data:I},{type:12,data:E},{type:12,data:C},{type:6,data:A},{type:12,data:g},{type:12,data:l},{type:12,data:p},...Z(e[0].dims,e[1].dims)];i&&(v.push(...Z(e[2].dims)),w.push("rank")),v.push(...Z(n));let D=L=>{let X=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:I.length},{name:"dilations",type:"u32",length:I.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Q=Ee(e[0].dataType),J=a?1:2,O=a?2:3,W=a?3:1,Y=N("W",e[1].dataType,e[1].dims.length,x),P=N("Dy",e[0].dataType,e[0].dims.length,f),se=[P,Y];i&&se.push(N("bias",e[2].dataType,[n[W]].length,y));let ne=j("result",e[0].dataType,n.length,y),te=()=>{let F="";if(m)f===4?F+=`
        let xValue = ${P.getByOffset("x_offset")};
        let wValue = ${Y.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:f===2?F+=`
          dotProd = dotProd + dot(vec4<${Q}>(${P.getByOffset("x_offset")}, ${P.getByOffset("x_offset + 1u")}), vec4<${Q}>(${Y.getByOffset("w_offset")}, ${Y.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:f===1&&(F+=`
          dotProd = dotProd + dot(vec4<${Q}>(${P.getByOffset("x_offset")}, ${P.getByOffset("x_offset + 1u")}, ${P.getByOffset("x_offset + 2u")}, ${P.getByOffset("x_offset + 3u")}), vec4<${Q}>(${Y.getByOffset("w_offset")}, ${Y.getByOffset("w_offset + 1u")}, ${Y.getByOffset("w_offset + 2u")}, ${Y.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(F+=`
                  let xValue = ${a?P.getByOffset(`${P.indicesToOffset(`${P.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):P.get("batch","inputChannel","idyR","idyC")};
        `,f===1)F+=`
          let w_offset = ${Y.indicesToOffset(`${Y.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Y.getByOffset(`w_offset / ${x}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let V=0;V<f;V++)F+=`
            let wValue${V} = ${Y.getByOffset(`${Y.indicesToOffset(`${Y.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${V}, wOutChannel)`)} / ${x}`)};
            dotProd = dotProd + xValue[${V}] * wValue${V};`;return F},U=()=>{if(_===0)return"";if(!m)throw new Error(`packInputAs4 ${m} is not true.`);let F="";if(f===1){F+="dotProd = dotProd";for(let V=0;V<_;V++)F+=`
            + ${P.getByOffset(`x_offset + ${V}`)} * ${Y.getByOffset(`w_offset + ${V}`)}`;F+=";"}else if(f===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);F+=`
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
                var x_offset = ${P.indicesToOffset(`${P.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${Y.indicesToOffset(`${Y.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${x};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${m?4:f}) {
                  ${te()}
                  inputChannel = inputChannel + ${m?4:f};
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
    ${H}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${x}${y}${m}${_}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:v}),getShaderSource:D}}}),wl,$l,bl,gn,vl,xl,yn,Sl,kl,Lm=M(()=>{"use strict";Pm(),Bt(),ht(),wl=(e,t,r,i,n,a)=>(e-1)*t+r+(i-1)*n+1-a,$l=(e,t,r,i,n)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=a,r[n]=e-a):t==="SAME_LOWER"&&(r[i]=e-a,r[n]=a)},bl=(e,t,r,i,n,a,o,u,l,p)=>{let f=e.length-2,m=p.length===0;l.length<f&&l.push(...Array(f-l.length).fill(0));let g=e[0],_=t[u?3:1]*n;for(let y=0,x=e.length-f-(u?1:0);y<f;++y,++x){let S=e[x],$=m?S*o[y]:p[y],w=wl(S,o[y],a[y],t[x],r[y],$);$l(w,i,a,y,y+f),m&&p.push(o[y]*(S-1)+l[y]+(t[x]-1)*r[y]+1-a[y]-a[y+f])}p.splice(0,0,g),p.splice(u?3:1,0,_)},gn=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((m,g)=>m*g,1)===0){r.length=0;for(let m=2;m<t[1].dims.length;++m)r.push(t[1].dims[m])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),a=e.outputShape.slice(),o=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((m,g)=>m+g,0)===0){let m=t[0].dims.length-2;l=new Array(m).fill(1)}let p=e.strides.slice();if(p.reduce((m,g)=>m+g,0)===0){let m=t[0].dims.length-2;p=new Array(m).fill(1)}bl(u,r,l,e.autoPad,e.group,n,p,i,o,a);let f=Object.assign({},e);return Object.assign(f,{kernelShape:r,pads:n,outputPadding:o,outputShape:a,dilations:l,strides:p}),f},vl=e=>{let t=rn(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,a=e.group??1,o=e.kernelShape,u=e.pads,l=e.strides,p=e.wIsConst(),f=e.outputPadding,m=e.outputShape;return{autoPad:i,format:r,dilations:n,group:a,kernelShape:o,outputPadding:f,outputShape:m,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},xl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((o,u)=>o+u,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((o,u)=>o+u,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((o,u)=>o+u,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((o,u)=>o+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},yn=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(Pe(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let a=[t[0],n];t.length===3&&a.push(t[2]),e.compute(_l(a,r,i),{inputs:a})},Sl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],o=[1].concat(o),a=[1].concat(a),n=[1].concat(n);let l=t.outputPadding;l=[0].concat(l);let p=gn({...t,pads:u,strides:o,dilations:a,kernelShape:n,outputPadding:l},i);yn(e,i,p,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},kl=(e,t)=>{if(xl(e.inputs,t),e.inputs[0].dims.length===3)Sl(e,t);else{let r=gn(t,e.inputs);yn(e,e.inputs,r)}}}),Tl,Il,El,qm=M(()=>{"use strict";ee(),re(),$e(),ie(),Tl=(e,t,r,i)=>{let n=B.size(t),a=t.length,o=N("input",e,a),u=j("output",e,a),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=B.normalizeAxis(l,a),f=m=>{let g=` i32(${o.indicesGet("inputIndices","uniforms.axis")}) `,_=K("uniforms.input_shape","uniforms.axis",a),y=i.reverse?g+(i.exclusive?" + 1":""):"0",x=i.reverse?_:g+(i.exclusive?"":" + 1");return`
                ${m.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(o,u)}
                ${m.mainStart()}
                  ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${x};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${o.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:p},...Z(t,t)]}),getShaderSource:f}},Il=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(Tl(i,r,n,t),{inputs:[0]})},El=e=>{let t=e.exclusive===1,r=e.reverse===1;return he({exclusive:t,reverse:r})}}),Cl,zl,Al,Ol,Bl,Wm=M(()=>{"use strict";ee(),re(),$e(),ie(),Cl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},zl=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)n.push(r.indicesSet("a",e[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)},Al=(e,t)=>{let r,i,n,a,o,u,l=t.format==="NHWC",p=t.blocksize,f=t.mode==="DCR";l?([r,i,n,a]=e.dims,o=f?[r,i,n,p,p,a/p**2]:[r,i,n,a/p**2,p,p],u=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=f?[r,p,p,a/p**2,i,n]:[r,a/p**2,p,p,i,n],u=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let m=e.reshape(o),g=m.dims.length,_=e.dataType,y=N("a",_,g),x=j("output",_,g),S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(y,x)}

  ${zl(u,g,y,x)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let w=l?[r,i*p,n*p,a/p**2]:[r,a/p**2,i*p,n*p],T=B.size(w),I=m.dims,E=B.sortBasedOnPerm(I,u);return{outputs:[{dims:w,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...Z(I,E)]}},getShaderSource:S}},Ol=(e,t)=>{Cl(e.inputs),e.compute(Al(e.inputs[0],t))},Bl=e=>he({blocksize:e.blocksize,mode:e.mode,format:e.format})}),lt,or,Ur,_n,mt,Rl,Nl,Dl,wn,$n,bn,Ml,Ul,vn,Pl,Ll,ql,Vm=M(()=>{"use strict";ee(),re(),$e(),ie(),lt=256,or=512,Ur=2*Math.PI,_n=e=>{let t=[],r=e;for(let i of[4,2,3,5])for(;r%i===0;)t.push(i),r/=i;return r===1?t:void 0},mt=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},Rl=(e,t,r,i,n)=>{let a=r/e,o=or-i,u=p=>`smem[${o}u + base + ${p*t}u]`,l=`  for (var t = local_idx; t < ${a}u; t += ${lt}u) {
`;l+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,l+=`    var leg: array<vec2<f32>, 5>;
`;for(let p=0;p<e;p++){let f=`${i}u + t + ${p*a}u`;if(p===0)l+=`    leg[0] = smem[${f}];
`;else{let m=n*Ur*p/(e*t);l+=`    { let a = ${mt(m)} * angleUnit; leg[${p}] = cmul(smem[${f}], vec2<f32>(cos(a), sin(a))); }
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
`}else for(let p=0;p<e;p++){let f=["leg[0]"];for(let m=1;m<e;m++){let g=n*Ur*(m*p)/e,_=mt(Math.cos(g)),y=mt(Math.sin(g));f.push(`vec2<f32>(leg[${m}].x*${_} - leg[${m}].y*${y}, leg[${m}].x*${y} + leg[${m}].y*${_})`)}l+=`    ${u(p)} = ${f.join(" + ")};
`}return`${l}  }
  workgroupBarrier();
`},Nl=(e,t,r)=>{let i="",n=1,a=0;for(let o of e)i+=Rl(o,n,t,a,r),n*=o,a=or-a;return{code:i,resultOffset:a}},Dl=(e,t,r,i,n)=>{let a=e.dims,o=a.length,u=a[o-1],l=a[t],p=r&&i?(l-1)*2:l;n!==void 0&&(p=n);let f=r&&i?1:2,m=i&&!r?Math.floor(p/2)+1:p,g=a.slice();g[t]=m,g[o-1]=f;let _=1;for(let x=t+1;x<o-1;x++)_*=a[x];let y=B.size(a)/u/l;return{dataType:e.dataType,outputDims:g,length:p,signalLength:l,inner:_,batch:y,inputComponents:u,outputComponents:f,outputLength:m,inverse:r,onesided:i}},wn=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),$n=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],bn=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),Ml=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:a,onesided:o}=e,u=Ce(t),l=a?1:-1,p=a?1/r:1,f=_n(r),m=g=>{let _=N("x",t,[1]),y=j("y",t,[1]),x=E=>{let C=`inBase + (${E}) * uniforms.inner * ${i}u`,A=`f32(${_.getByOffset(C)})`,v=i===2?`f32(${_.getByOffset(`${C} + 1u`)})`:"0.0";return`vec2<f32>(${A}, ${v})`},S;if(a&&o){let E=Math.floor(r/2)+1,C=r%2===0?`select(provided, provided - 1u, provided == ${E}u)`:"provided";S=`
    let provided = min(uniforms.signalLength, ${E}u);
    for (var i = local_idx; i < ${r}u; i += ${lt}u) {
      if (i < provided) { smem[i] = ${x("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${C}; k += ${lt}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else S=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${lt}u) {
      if (i < loadCount) { smem[i] = ${x("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:$,resultOffset:w}=Nl(f,r,l),T=p===1?`smem[${w}u + i]`:`smem[${w}u + i] * ${mt(p)}`,I=n===2?y.setByOffset("off + 1u",`${u}(v.y)`):"";return`
  ${bn(g,_,y)}
  var<workgroup> smem: array<vec2<f32>, ${2*or}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${g.mainStart(lt)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    ${S}
${$}    for (var i = local_idx; i < uniforms.outputLength; i += ${lt}u) {
      let v = ${T};
      let off = outBase + i * uniforms.inner * ${n}u;
      ${y.setByOffset("off",`${u}(v.x)`)}
      ${I}
    }
  }`};return{name:"DFT",shaderCache:{hint:wn(e,"fft"),inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:$n(e),dispatchGroup:{x:e.batch}})}},Ul=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:a,onesided:o}=e,u=Ce(t),l=a?1:-1,p=a?1/r:1,f=m=>{let g=N("x",t,[1]),_=j("y",t,[1]),y=T=>{let I=`inBase + (${T}) * uniforms.inner * ${i}u`,E=`f32(${g.getByOffset(I)})`,C=i===2?`f32(${g.getByOffset(`${I} + 1u`)})`:"0.0";return`vec2<f32>(${E}, ${C})`},x=a&&o?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
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
      let angle = ${mt(l*Ur)} * f32(knMod) / ${mt(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,$=n===2?_.setByOffset("off + 1u",`${u}(v.y)`):"",w=p===1?"acc":`acc * ${mt(p)}`;return`
  ${bn(m,g,_)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${x}
  ${m.mainStart(lt)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${lt}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${S}
      }
      let v = ${w};
      let off = outBase + k * uniforms.inner * ${n}u;
      ${_.setByOffset("off",`${u}(v.x)`)}
      ${$}
    }
  }`};return{name:"DFT",shaderCache:{hint:wn(e,"direct"),inputDependencies:["type"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:$n(e),dispatchGroup:{x:e.batch}})}},vn=e=>{if(!e||e.dataType===0)return;if(B.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},Pl=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},Ll=(e,t)=>{Pl(e.inputs);let r=e.inputs[0],i=r.dims.length,n=t.inverse!==0,a=t.onesided!==0,o=vn(e.inputs[1]);if(o!==void 0&&o<=0)throw new Error("dft_length must be greater than zero.");let u=B.normalizeAxis(vn(e.inputs[2])??t.axis,i);if(u===i-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(n&&a&&r.dims[i-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let l=Dl(r,u,n,a,o);if(l.length<=0)throw new Error(`Invalid DFT length: ${l.length}`);let p=l.length<=or&&_n(l.length)!==void 0?Ml(l):Ul(l);e.compute(p,{inputs:[0]})},ql=e=>he({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Pr,ur,xn,Wl,Vl,Gl,Hl,Sn,Fl,jl,Kl,Gm=M(()=>{"use strict";ee(),re(),$e(),ie(),Pr="[a-zA-Z]|\\.\\.\\.",ur="("+Pr+")+",xn="^"+ur+"$",Wl="("+ur+",)*"+ur,Vl="^"+Wl+"$",Gl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Hl=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Vl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,a)=>{let o=e[a].dims.slice();if(!n.match(RegExp(xn)))throw new Error("Invalid LHS term");let u=this.processTerm(n,!0,o,a);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,a])=>a.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(ur)))throw new Error("Invalid RHS");i.match(RegExp(Pr,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(n);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,a=!1,o=[],u=0;if(!e.match(RegExp(xn))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Pr,"g")),p=new Gl(i);return l?.forEach((f,m)=>{if(f==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let g=n-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(o=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw new Error("Ellipsis must be specified in the LHS");for(let _=0;_<o.length;_++){let y=String.fromCharCode(48+_);p.addSymbol(y,m+_),this.addSymbol(y,r[u++],i)}}else p.addSymbol(f,m+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,r[u++],i)}),p}},Sn=e=>e+"_max",Fl=(e,t,r,i)=>{let n=e.map(p=>p.length).map((p,f)=>N(`input${f}`,t,p)),a=B.size(i),o=j("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),l=p=>{let f=[],m="var prod = 1.0;",g="var sum = 0.0;",_="sum += prod;",y=[],x=[],S=[],$=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((I,E)=>{if(r.rhs.symbolToIndices.has(E)){let C=r.rhs.symbolToIndices.get(E)?.[0];C!==void 0&&r.lhs.forEach((A,v)=>{if(I.inputIndices.includes(v)){let D=A.symbolToIndices.get(E);if(D===void 0)throw new Error("Invalid symbol error");D.forEach(L=>{f.push(`${n[v].indicesSet(`input${v}Indices`,L,o.indicesGet("outputIndices",C))}`)})}})}else r.lhs.forEach((C,A)=>{if(I.inputIndices.includes(A)){let v=C.symbolToIndices.get(E);if(v===void 0)throw new Error("Invalid symbol error");v.forEach(D=>{y.push(`${n[A].indicesSet(`input${A}Indices`,D,`${E}`)}`)}),$.push(`prod *= ${n[A].getByIndices(`input${A}Indices`)};`)}}),x.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${Sn(E)}; ${E}++) {`),S.push("}")});let T=w?[...f,`let sum = ${n.map((I,E)=>I.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...f,g,...x,...y,m,...$,_,...S];return`
            ${p.registerUniforms(u.map(I=>({name:`${Sn(I)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,o)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${o.offsetToIndices("global_idx")};
            ${n.map((I,E)=>`var input${E}Indices: ${n[E].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${o.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=u.filter(m=>r.symbolToInfo.has(m)).map(m=>({type:12,data:r.symbolToInfo.get(m)?.dimValue||0}));p.push({type:12,data:a});let f=e.map((m,g)=>[...Z(m)]).reduce((m,g)=>m.concat(g),p);return f.push(...Z(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}},getShaderSource:l}},jl=(e,t)=>{let r=new Hl(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((a,o)=>a.dims);e.compute(Fl(n,e.inputs[0].dataType,r,i))},Kl=e=>{let t=e.equation.replace(/\s+/g,"");return he({equation:t})}}),Zl,kn,Ql,Xl,Yl,Hm=M(()=>{"use strict";ee(),re(),ie(),Zl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},kn=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},Ql=(e,t)=>e.length>t.length?kn(e,t):kn(t,e),Xl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=Ql(t,r),n=e[0].dataType,a=n===9||B.size(t)===1,o=n===9||t.length>0&&t[t.length-1]%4===0?4:1,u=a||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(B.size(i)/u),p=m=>{let g=N("input",n,t.length,o),_=j("output",n,i.length,u),y;if(n===9){let x=(S,$,w="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${g.broadcastedIndicesToOffset(`outputIndices${$}`,_)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${S}[${$}] = ${w}(${g.getByOffset(`index${$}`)}[component${$}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${x("data",0,"u32")}
        ${x("data",1,"u32")}
        ${x("data",2,"u32")}
        ${x("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${g.getByOffset(`inputOffset / ${o}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${m.registerUniform("vec_size","u32").declareVariables(g,_)}
    ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},f=[{type:12,data:l},...Z(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${o}${u}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f})}},Yl=e=>{Zl(e.inputs),e.compute(Xl(e.inputs),{inputs:[0]})}}),Jl,ed,Fm=M(()=>{"use strict";ee(),re(),ie(),tn(),Jl=e=>{let t=e[0].dataType,r=B.size(e[0].dims),i=B.size(e[1].dims),n=i%4===0,a=o=>{let u=N("x",t,[1],4),l=N("bias",t,[1],4),p=j("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],m=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,g=n?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${m(0)}${m(1)}${m(2)}${m(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${o.registerUniforms(f).declareVariables(u,l,p)}

    ${Ji(Ce(t))}

    ${o.mainStart(jt)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",en("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:o=>({outputs:[{dims:o[0].dims,dataType:o[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/jt/4)}})}},ed=e=>{e.inputs.length<2||B.size(e.inputs[1].dims)===0?Eu(e):e.compute(Jl(e.inputs))}}),td,rd,id,nd,jm=M(()=>{"use strict";ee(),re(),$e(),ie(),td=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},rd=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=B.normalizeAxis(t.axis,n),o=r.slice(0);o.splice(a,1,...i);let u=r[a],l=e[0].dataType===9?4:1,p=Math.ceil(B.size(o)/l),f=[{type:12,data:p},{type:6,data:u},{type:12,data:a},...Z(e[0].dims,e[1].dims,o)],m=g=>{let _=N("data",e[0].dataType,e[0].dims.length,l),y=N("inputIndices",e[1].dataType,e[1].dims.length),x=j("output",e[0].dataType,o.length,l),S=w=>{let T=i.length,I=`var indicesIndices${w}  = ${y.type.indices}(0);`;for(let E=0;E<T;E++)I+=`${T>1?`indicesIndices${w}[${E}]`:`indicesIndices${w}`} = ${o.length>1?`outputIndices${w}[uniforms.axis + ${E}]`:`outputIndices${w}`};`;I+=`
          var idx${w} = ${y.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${_.type.indices};
        `;for(let E=0,C=0;E<n;E++)E===a?(I+=`${n>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = u32(idx${w});`,C+=T):(I+=`${n>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = ${o.length>1?`outputIndices${w}[${C}]`:`outputIndices${w}`};`,C++);return I},$;if(e[0].dataType===9){let w=(T,I,E="")=>`
          let outputIndices${I} = ${x.offsetToIndices(`outputOffset + ${I}u`)};
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
        ${x.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${x.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${_.getByIndices("dataIndices")};
      ${x.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,y,x)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:m}},id=e=>he({axis:e.axis}),nd=(e,t)=>{let r=e.inputs;td(r),e.compute(rd(e.inputs,t))}}),ad,sd,od,Km=M(()=>{"use strict";ee(),re(),ie(),ad=(e,t,r,i,n,a,o,u,l)=>{let p=[{type:12,data:a},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:o},{type:12,data:u},{type:12,data:l}],f=[a];p.push(...Z(t.dims,f));let m=g=>{let _=N("indices_data",t.dataType,t.dims.length),y=j("input_slice_offsets_data",12,1,1),x=[_,y],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(S).declareVariables(...x)}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:m},{inputs:[t],outputs:[-1]})[0]},sd=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,a=r[1].dims,o=a[a.length-1],u=B.sizeToDimension(a,a.length-1),l=B.sizeFromDimension(i,t.batchDims+o),p=B.sizeToDimension(i,t.batchDims),f=B.sizeFromDimension(i,t.batchDims),m=u/p,g=new Array(o),_=l;for(let I=0;I<o;++I)g[o-1-I]=_,_*=i[t.batchDims+o-1-I];let y=ad(e,r[1],g,t.batchDims,i,u,m,f,o),x=t.batchDims+o;if(x>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=a.slice(0,-1).concat(i.slice(x)),$=B.size(S),w=[{type:12,data:$},{type:12,data:l},...Z(r[0].dims,y.dims,S)],T=I=>{let E=N("data",r[0].dataType,r[0].dims.length),C=N("slice_offsets",12,y.dims.length),A=j("output",r[0].dataType,S.length);return`
          ${I.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,C,A)}
            ${I.mainStart()}
            ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:n}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:w}),getShaderSource:T},{inputs:[r[0],y]})},od=e=>({batchDims:e.batch_dims,cacheKey:""})}),ud,ld,dd,pd,Zm=M(()=>{"use strict";ee(),re(),$e(),ie(),ud=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=B.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],a=e[2],o=e.length===4?e[3]:void 0;if(a.dims.length!==n.dims.length||!n.dims.map((u,l)=>l===r?Math.ceil(u/i)===a.dims[l]:u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==a.dims.length||!o.dims.map((u,l)=>u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},ld=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=B.normalizeAxis(t.gatherAxis,n),o=B.normalizeAxis(t.quantizeAxis,n),u=r.slice(0);u.splice(a,1,...i);let l=B.size(u),p=e[2].dataType,f=e[0].dataType===22,m=[{type:12,data:l},{type:12,data:o},{type:12,data:a},{type:12,data:t.blockSize},...Z(...e.map((_,y)=>_.dims),u)],g=_=>{let y=N("data",e[0].dataType,e[0].dims.length),x=N("inputIndices",e[1].dataType,e[1].dims.length),S=N("scales",e[2].dataType,e[2].dims.length),$=e.length>3?N("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=j("output",p,u.length),T=[y,x,S];$&&T.push($);let I=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${_.registerUniforms(I).declareVariables(...T,w)}
        ${_.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
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
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
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
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ce(p)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((_,y)=>y!==1).map(_=>_.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(_,y)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:m}),getShaderSource:g}},dd=(e,t)=>{let r=e.inputs;ud(r,t),e.compute(ld(e.inputs,t))},pd=e=>he({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),cd,fd,hd,md,Qm=M(()=>{"use strict";ee(),re(),$e(),ie(),cd=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},fd=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,a=e[1].dims,o=e[1].dataType,u=B.normalizeAxis(t.axis,n),l=r[u],p=a.slice(0),f=B.size(p),m=N("input",i,n),g=N("indicesInput",o,a.length),_=j("output",i,p.length),y=[{type:12,data:f},{type:6,data:l},{type:12,data:u}];return y.push(...Z(r,a,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:y}),getShaderSource:x=>`
      ${x.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,g,_)}
      ${x.mainStart()}
      ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${m.type.indices}(outputIndices);
      ${m.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${m.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},hd=e=>he({axis:e.axis}),md=(e,t)=>{let r=e.inputs;cd(r),e.compute(fd(e.inputs,t))}}),gd,yd,_d,wd,Xm=M(()=>{"use strict";ee(),re(),ie(),gd=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},yd=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,a,o]=ws.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[n,a];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(a/l),f=Math.ceil(n/l),m=!0,g=B.size(u),_=[{type:12,data:m?p:g},{type:12,data:n},{type:12,data:a},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(_.push(...Z(e[2].dims)),y.push("rank")),_.push(...Z(u));let x=$=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",I=N("a",e[0].dataType,e[0].dims),E=N("b",e[1].dataType,e[1].dims),C=I.type.value,A=null,v=[I,E];e.length===3&&(A=N("c",e[2].dataType,e[2].dims.length),v.push(A));let D=j("output",e[0].dataType,u.length);v.push(D);let L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(L).declareVariables(...v)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${T}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",D)}; value += ${C}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=$=>{let w=N("a",e[0].dataType,e[0].dims),T=N("b",e[1].dataType,e[1].dims),I=null,E=[w,T];e.length===3&&(I=N("c",e[2].dataType,e[2].dims.length),E.push(I));let C=j("output",e[0].dataType,u.length);E.push(C);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],v="",D="";t.transA&&t.transB?(D=`
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
      `,v="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(D=`
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
      `,v="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(D=`
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
      `,v="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(D=`
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
      `,v="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let L=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(A).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${D}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${v}
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
  }`};return m?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:p*f},programUniforms:_}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:x}},_d=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},wd=(e,t)=>{gd(e.inputs),e.compute(yd(e.inputs,t))}}),Ye,dt,Rt,Nt,$d,bd,vd,xd,Sd,kd,Td,Id,Ed,Cd,Ym=M(()=>{"use strict";ee(),re(),$e(),ie(),[Ye,dt,Rt,Nt]=[0,1,2,3],$d=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},bd=`
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
`,vd=e=>`
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
`,xd=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Sd=e=>`
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
`,kd=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Ye}] = batch;
     indices[${dt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Rt}] = u32(r);
            indices[${Nt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Rt}] = u32(clamp(r, 0, H - 1));
          indices[${Nt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Rt}] = gs_reflect(r, border[1], border[3]);
          indices[${Nt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Td=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Ye}], indices[${dt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Ye}], indices[${dt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Ye}], indices[${dt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Ye}], indices[${dt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Ye}], indices[${dt}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Ye}], indices[${dt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Id=(e,t)=>{let r=N("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=N("grid",e[1].dataType,i.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Ye,dt,Rt,Nt]=[0,3,1,2]);let o=j("output",e[0].dataType,a.length),u=r.type.value,l=B.size(a),p=[{type:12,data:l},...Z(e[0].dims,i,a)],f=m=>`
  ${m.registerUniform("output_size","u32").declareVariables(r,n,o)}
  ${bd}
  ${vd(u)}
  ${xd(t)}
  ${Sd(t)}
  ${kd(r,u,t)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Rt}]);
      let W_in = i32(uniforms.x_shape[${Nt}]);

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

      let indices = ${o.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Ye}], indices[${Rt}], indices[${Nt}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Td(o,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:m=>{let g=B.size(a);return{outputs:[{dims:a,dataType:m[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:p}},getShaderSource:f}},Ed=(e,t)=>{$d(e.inputs),e.compute(Id(e.inputs,t))},Cd=e=>he({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Re,zd,Ad,Tn,Od,lr,Bd,Rd=M(()=>{"use strict";ee(),re(),$e(),Li(),Xi(),ie(),ht(),Re=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,zd=(e,t)=>{let r=e[0],i=Re(e,1),n=Re(e,2),a=Re(e,3),o=Re(e,4),u=Re(e,5),l=Re(e,6),p=Re(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=r.dims[0],m=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=m,y=0,x=0,S=Math.floor(g/t.numHeads);if(l&&p&&B.size(l.dims)&&B.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==f||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==f||p.dims[1]!==t.numHeads||p.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=l.dims[2],x=l.dims[2]}else if(l&&B.size(l.dims)||p&&B.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(i&&B.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,_=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,_=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,_=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(a&&B.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=y+_,T=0;if(o&&B.size(o.dims)>0){T=8;let A=o.dims;throw A.length===1?A[0]===f?T=1:A[0]===3*f+2&&(T=3):A.length===2&&A[0]===f&&A[1]===w&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let I=!1,E=g;if(n&&B.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(_!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=n.dims[2]}else{if(_!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=n.dims[1]*n.dims[3],I=!0}}let C=!1;if(o&&B.size(o.dims)>0)throw new Error("Key padding mask is not supported");if(u&&B.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==f||u.dims[1]!==t.numHeads||u.dims[2]!==m||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:m,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:w,maxSequenceLength:x,inputHiddenSize:0,hiddenSize:g,vHiddenSize:E,headSize:S,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:C,passPastInKv:I,qkvFormat:$}},Ad=e=>he({...e}),Tn=he({perm:[0,2,1,3]}),Od=(e,t,r,i,n,a,o)=>{let u=[i,n,a],l=B.size(u),p=[{type:12,data:l},{type:12,data:o},{type:12,data:a}],f=m=>{let g=j("qkv_with_bias",t.dataType,u),_=N("qkv",t.dataType,u),y=N("bias",r.dataType,u),x=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${m.registerUniforms(x).declareVariables(_,y,g)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:f},{inputs:[t,r],outputs:[-1]})[0]},lr=(e,t,r,i,n,a,o,u)=>{let l=a;if(o&&B.size(o.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Od(e,a,o,t,i,r*n,u),l=l.reshape([t,i,r,n]),r===1||i===1?l:e.compute(Pe(l,Tn.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,i,r,n])),r===1||i===1?l:e.compute(Pe(l,Tn.perm),{inputs:[l],outputs:[-1]})[0]},Bd=(e,t)=>{let r=zd(e.inputs,t),i=e.inputs[0],n=Re(e.inputs,1),a=Re(e.inputs,2),o=Re(e.inputs,3),u=Re(e.inputs,4),l=Re(e.inputs,5),p=Re(e.inputs,6),f=Re(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let m=n&&a&&n.dims.length===4&&a.dims.length===4,g=lr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,o,0);if(m)return ir(e,g,n,a,u,void 0,p,f,l,r);if(!n||!a)throw new Error("key and value must be provided");let _=lr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,o,r.hiddenSize),y=lr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,o,2*r.hiddenSize);ir(e,g,_,y,u,void 0,p,f,l,r)}}),Nd,Dd,Md,Ud,In,Pd,Ld,qd=M(()=>{"use strict";ee(),re(),$e(),ie(),Nd=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Dd=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),he({numOutputs:i,axis:t.axis,splitSizes:r})},Md=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Ud=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},In=(e,t)=>{let r=e[0].dims,i=B.size(r),n=e[0].dataType,a=B.normalizeAxis(t.axis,r.length),o=new Array(t.numOutputs),u=N("input",n,r.length),l=new Array(t.numOutputs),p=[],f=[],m=0,g=[{type:12,data:i}];for(let y=0;y<t.numOutputs;y++){m+=t.splitSizes[y],l[y]=m;let x=r.slice();x[a]=t.splitSizes[y],f.push(x),o[y]=j(`output${y}`,n,x.length),p.push({dims:f[y],dataType:e[0].dataType})}g.push({type:12,data:l},...Z(r,...f));let _=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...o)}
  ${Md(l.length)}
  ${Ud(o)}

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
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},Pd=(e,t)=>{Nd(e.inputs);let r=e.inputs.length===1?t:Dd(e.inputs,t);e.compute(In(e.inputs,r),{inputs:[0]})},Ld=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return he({axis:t,numOutputs:i,splitSizes:r})}}),Wd,Lr,Vd,Gd=M(()=>{"use strict";ee(),re(),$e(),ie(),Wd=(e,t)=>{let[r,i,n,a]=e,{numHeads:o,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!B.areEqual(i.dims,[])&&!B.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!B.areEqual(n.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&o===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],p=r.dims[r.dims.length-2],f=n.dims[0],m=B.sizeFromDimension(r.dims,1)/p,g=u===0?n.dims[1]*2:m/o;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(p!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(p>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(g/2!==n.dims[1]&&u/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`)},Lr=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:a}=t,o=e[0].dims[0],u=B.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=u/l,f=e[2].dims[1],m=n===0?f*2:p/i,g=new Array(o,l,p/m,m-f),_=B.computeStrides(g),y=[{type:1,data:a},{type:12,data:g},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[u,p,m,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,m,l*m,1]}):[],...Z(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],x=S=>{let $=N("input",e[0].dataType,e[0].dims.length),w=N("position_ids",e[1].dataType,e[1].dims.length),T=N("cos_cache",e[2].dataType,e[2].dims.length),I=N("sin_cache",e[3].dataType,e[3].dims.length),E=j("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
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
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:he({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(g)/jt)},programUniforms:y})}},Vd=(e,t)=>{Wd(e.inputs,t),e.compute(Lr(e.inputs,t))}}),Hd,Fd,En,jd,Kd,Jm=M(()=>{"use strict";$e(),ee(),Xi(),Rd(),qd(),ht(),Gd(),ie(),Hd=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],a=e[3],o=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],p=r.dims[1],f=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],m=p,g=0,_=!i||i.dims.length===0,y=Math.floor(_?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);_&&(f=y*t.numHeads);let x=a&&a.dims.length!==0,S=o&&o.dims.length!==0;if(x&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(x&&S){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=a.dims[2]}else if(x||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');m=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');m=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');m=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let w=0,T=!1,I=t.kvNumHeads?y*t.kvNumHeads:f;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(m!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=n.dims[2]}else{if(m!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');I=n.dims[1]*n.dims[3],T=!0}}let E=e.length>4?e[5]:void 0;if(E){if(E.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let C=E.dims.reduce((A,v)=>A*v,1);if(C!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${C}.`);for(let A=0;A<E.dims.length;A++)if(E.dims[A]!==1&&E.dims[A]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${A}] = ${E.dims[A]}.`)}return{batchSize:l,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:I,headSize:y,vHeadSize:Math.floor(I/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:$}},Fd=he({perm:[0,2,1,3]}),En=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(Pe(i,Fd.perm),{inputs:[i],outputs:[-1]})[0]),i},jd=(e,t,r,i)=>{let n=7,a=["type","type"],o=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],p=f=>{let m=N("seq_lens",r.dataType,r.dims),g=N("total_seq_lens",i.dataType,i.dims),_=j("pos_ids",n,o),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${f.registerUniforms(y).declareVariables(m,g,_)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:p}},Kd=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=Hd(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,f=r.kvNumHeads?r.kvNumHeads:r.numHeads,m=he({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,f*r.headSize,f*r.headSize]}),[g,_,y]=!n&&!a?e.compute(In([i],m),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,a],x,S;if(t.doRotary){let I=e.compute(jd(r.batchSize,r.sequenceLength,l,p),{inputs:[l,p],outputs:[-1]})[0],E=e.inputs[7],C=e.inputs[8],A=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),v=[g,I,E,C],D=[-1];x=e.compute(Lr(v,A),{inputs:v,outputs:D})[0],v.splice(0,1,_);let L=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});S=e.compute(Lr(v,L),{inputs:v,outputs:D})[0]}let $=lr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?x:g,void 0,0),w=En(e,t.doRotary?S:_,r),T=En(e,y,r);ir(e,$,w,T,void 0,void 0,o,u,void 0,r,l,p)}}),Cn,Zd,Qd,Xd,eg=M(()=>{"use strict";ee(),re(),ht(),ie(),Cn=(e,t,r,i,n,a,o,u)=>{let l=be(a),p=l===1?"f32":`vec${l}f`,f=l===1?"vec2f":`mat2x${l}f`,m=n*o,g=64;m===1&&(g=256);let _=[n,o,a/l],y=[n,o,2],x=["rank","type","type"],S=[];S.push(...Z(_,y));let $=w=>{let T=N("x",t.dataType,3,l),I=N("scale",r.dataType,r.dims),E=N("bias",i.dataType,i.dims),C=j("output",1,3,2),A=[T,I,E,C];return`
  var<workgroup> workgroup_shared : array<${f}, ${g}>;
  const workgroup_size = ${g}u;
  ${w.declareVariables(...A)}
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
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${ft("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${ft("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${g}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:m},programUniforms:S}),getShaderSource:$},{inputs:[t,r,i],outputs:[-1]})[0]},Zd=(e,t,r)=>{let i=t[0].dims,n=i,a=2,o=i[0],u=i[1],l=B.sizeFromDimension(i,a),p=be(l),f=B.size(n)/p,m=Cn(e,t[0],t[1],t[2],o,l,u,r.epsilon),g=[o,u,l/p],_=[o,u],y=["type","none"],x=S=>{let $=N("x",t[0].dataType,g.length,p),w=N("scale_shift",1,_.length,2),T=j("output",t[0].dataType,g.length,p),I=[$,w,T];return`
  ${S.registerUniform("output_size","u32").declareVariables(...I)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...Z(g,_,g)]}),getShaderSource:x},{inputs:[t[0],m]})},Qd=(e,t,r)=>{let i=t[0].dims,n=i,a=i[0],o=i[i.length-1],u=B.sizeFromDimension(i,1)/o,l=be(o),p=B.size(n)/l,f=[{type:12,data:u},{type:12,data:Math.floor(o/l)}],m=["type","type"],g=!1,_=[0,i.length-1];for(let $=0;$<i.length-2;$++)g=g||i[$+1]!==1,_.push($+1);g=g&&i[i.length-1]!==1;let y=g?e.compute(Pe(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},($,w)=>i[_[w]])),x=Cn(e,y,t[1],t[2],a,u,o,r.epsilon),S=$=>{let w=Ee(t[0].dataType),T=l===1?"vec2f":`mat${l}x2f`,I=A=>{let v=A===0?"x":"y",D=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${w}(${D}(scale.${v}))`;case 2:return`vec2<${w}>(${D}(scale[0].${v}, scale[1].${v}))`;case 4:return`vec4<${w}>(${D}(scale[0].${v}, scale[1].${v}, scale[2].${v}, scale[3].${v}))`;default:throw new Error(`Not supported compoents ${l}`)}},E=N("input",t[0].dataType,t[0].dims,l),C=j("output",t[0].dataType,n,l);return`
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
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:S},{inputs:[t[0],x]})},Xd=(e,t)=>{t.format==="NHWC"?Qd(e,e.inputs,t):Zd(e,e.inputs,t)}}),Yd,Jd,ep,tg=M(()=>{"use strict";ee(),re(),ie(),Yd=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Jd=(e,t,r)=>{let i=t.simplified,n=e[0].dims,a=e[1],o=!i&&e[2],u=n,l=B.normalizeAxis(t.axis,n.length),p=B.sizeToDimension(n,l),f=B.sizeFromDimension(n,l),m=B.size(a.dims),g=o?B.size(o.dims):0;if(m!==f||o&&g!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${m} and bias size of ${g}`);let _=[];for(let E=0;E<n.length;++E)E<l?_.push(n[E]):_.push(1);let y=be(f),x=["type","type"],S=[{type:12,data:p},{type:1,data:f},{type:12,data:Math.floor(f/y)},{type:1,data:t.epsilon}];o&&x.push("type");let $=r>1,w=r>2,T=E=>{let C=Ee(e[0].dataType),A=[N("x",e[0].dataType,e[0].dims,y),N("scale",a.dataType,a.dims,y)];o&&A.push(N("bias",o.dataType,o.dims,y)),A.push(j("output",e[0].dataType,u,y)),$&&A.push(j("mean_data_output",1,_)),w&&A.push(j("inv_std_output",1,_));let v=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms(v).declareVariables(...A)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Gi("f32",y)};
    var mean_square_vector = ${Gi("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Kt(C,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${ft("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${ft("mean_square_vector",y)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Kt(C,y,"x[j + offset]")};
      let f32scale = ${Kt(C,y,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${Kt(C,y,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},I=[{dims:u,dataType:e[0].dataType}];return $&&I.push({dims:_,dataType:1}),w&&I.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${i}`,inputDependencies:x},getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:S}),getShaderSource:T}},ep=(e,t)=>{Yd(e.inputs),e.compute(Jd(e.inputs,t,e.outputCount))}}),tp,rp,rg=M(()=>{"use strict";re(),sn(),dn(),tp=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},rp=e=>{tp(e.inputs);let t=Ft.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(an(e.inputs,{activation:""},t));else{let n=t[t.length-2],a=B.size(e.inputs[0].dims.slice(0,-2)),o=B.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&n===1&&o===1){let u=e.inputs[0].reshape([1,a,i]),l=e.inputs[1].reshape([1,i,r]),p=[1,a,r],f=[u,l];e.compute(Nr(f,{activation:""},t,p),{inputs:f})}else e.compute(Nr(e.inputs,{activation:""},t))}}}),ip,np,ap,sp,op,ig=M(()=>{"use strict";ee(),re(),$e(),ie(),ip=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,o=e[1];if(!B.areEqual(o.dims,[t.n,n,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(B.size(u)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,p=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(B.size(l)!==p)throw new Error("zeroPoints input size error.")}},np=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,o=t.n,u=r.slice(0,i-2),l=B.size(u),p=e[1].dims[2]/4,f=e[0].dataType,m=be(t.k),g=be(p),_=be(o),y=u.concat([n,o]),x=n>1&&o/_%2===0?2:1,S=B.size(y)/_/x,$=64,w=[],T=[l,n,a/m],I=B.convertShape(e[1].dims).slice();I.splice(-1,1,p/g),w.push(...Z(T)),w.push(...Z(I)),w.push(...Z(e[2].dims)),e.length===4&&w.push(...Z(B.convertShape(e[3].dims)));let E=[l,n,o/_];w.push(...Z(E));let C=A=>{let v=T.length,D=N("a",e[0].dataType,v,m),L=N("b",12,I.length,g),X=N("scales",e[2].dataType,e[2].dims.length),Q=[D,L,X],J=e.length===4?N("zero_points",12,e[3].dims.length):void 0;J&&Q.push(J);let O=E.length,W=j("output",e[0].dataType,O,_),Y=Ee(e[0].dataType),P=(()=>{switch(m){case 1:return`array<${Y}, 8>`;case 2:return`mat4x2<${Y}>`;case 4:return`mat2x4<${Y}>`;default:throw new Error(`${m}-component is not supported.`)}})(),se=Math.floor(32/t.bits),ne=Math.floor(se/8),te=()=>{let F="";for(let V=0;V<ne;V++){let Se=V*t.bits*4,Qe=Se+t.bits;F+=`
          // reuse a data (pass ${V})
            var input_offset${V>0?V:""} = ${V===0?D.indicesToOffset(`${D.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${V>0?V:""}: ${P};
            for (var j${V>0?V:""}: u32 = 0; j${V>0?V:""} < ${8/m}; j${V>0?V:""}++) {
              a_data${V>0?V:""}[j${V>0?V:""}] = ${D.getByOffset(`input_offset${V>0?V:""}`)};
              input_offset${V>0?V:""}++;
            }
          `;for(let Oe=0;Oe<_*x;Oe++)F+=`
            b_value = ${g===1?`b${Oe}_data`:`b${Oe}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${V*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${Se}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Qe}u) & b_mask);`}
            b_quantized_values = ${P}(${Array.from({length:4},(Ie,ke)=>`${Y}(b_value_lower[${ke}]), ${Y}(b_value_upper[${ke}])`).join(", ")});
            b_dequantized_values = ${m===1?`${P}(${Array.from({length:8},(Ie,ke)=>`(b_quantized_values[${ke}] - ${J?`zero_point${Oe}`:"zero_point"}) * scale${Oe}`).join(", ")});`:`(b_quantized_values - ${P}(${Array(8).fill(`${J?`zero_point${Oe}`:"zero_point"}`).join(",")})) * scale${Oe};`};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(Oe/_)}]${_>1?`[${Oe%_}]`:""} += ${Array.from({length:8/m},(Ie,ke)=>`${m===1?`a_data${V>0?V:""}[${ke}] * b_dequantized_values[${ke}]`:`dot(a_data${V>0?V:""}[${ke}], b_dequantized_values[${ke}])`}`).join(" + ")};
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
            `;for(let V=0;V<_*x;V++)F+=`
            let scale${V} = ${X.getByOffset("col_index * nBlocksPerCol + block")};
            ${J?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${Y}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return F},H=()=>{let F=`col_index = col * ${_};`;for(let V=0;V<_*x;V++)F+=`
            let b${V}_data = ${L.getByIndices(`${L.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return F+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${P};
            var b_dequantized_values: ${P};`,F};return`
        var<workgroup> workgroup_shared: array<${W.type.value}, ${x*$}>;
        ${A.declareVariables(...Q,W)}
        ${A.mainStart([$,1,1])}
          let output_indices = ${W.offsetToIndices(`(global_idx / ${$}) * ${x}`)};
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

          if (local_id.x < ${x}) {
            var output_value: ${W.type.value} = ${W.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${W.setByIndices(`${W.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${m};${g};${_};${x};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:f}],dispatchGroup:{x:S},programUniforms:w}),getShaderSource:C}},ap=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,o=t.n,u=r.slice(0,i-2),l=B.size(u),p=e[1].dims[2]/4,f=e[0].dataType,m=be(t.k),g=be(p),_=u.concat([n,o]),y=128,x=o%8===0?8:o%4===0?4:1,S=y/x,$=Math.floor(32/t.bits),w=S*g*$,T=w/m,I=w/t.blockSize,E=B.size(_)/x,C=[],A=[l,n,a/m],v=B.convertShape(e[1].dims).slice();v.splice(-1,1,p/g),C.push(...Z(A)),C.push(...Z(v)),C.push(...Z(e[2].dims)),e.length===4&&C.push(...Z(B.convertShape(e[3].dims)));let D=[l,n,o];C.push(...Z(D));let L=X=>{let Q=A.length,J=N("a",e[0].dataType,Q,m),O=N("b",12,v.length,g),W=N("scales",e[2].dataType,e[2].dims.length),Y=[J,O,W],P=e.length===4?N("zero_points",12,e[3].dims.length):void 0;P&&Y.push(P);let se=D.length,ne=j("output",e[0].dataType,se),te=Ee(e[0].dataType),U=()=>{switch(m){case 1:return`
          let a_data0 = vec4<${te}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${te}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${te}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${te}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${m}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${J.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${ne.type.value}, ${S}>, ${x}>;
        ${X.declareVariables(...Y,ne)}
        ${X.mainStart([S,x,1])}
          let output_indices = ${ne.offsetToIndices(`workgroup_index * ${x}`)};
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
              ${(()=>{let H=Math.floor($/8),F="";for(let V=0;V<H;V++){let Se=V*t.bits*4,Qe=Se+t.bits;F+=`
              ${U()}
              {${t.bits===2?`
                let half_word = b_value >> ${V*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${Se}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Qe}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${te}>(${Array.from({length:4},(Oe,Ie)=>`${te}(b_value_lower[${Ie}]), ${te}(b_value_upper[${Ie}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${te}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Oe,Ie)=>`${`dot(a_data${Ie}, b_dequantized_values[${Ie}])`}`).join(" + ")};
              }
              word_offset += ${8/m};`}return F})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${x}) {
            var output_value: ${ne.type.value} = ${ne.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ne.setByIndices(`${ne.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${m};${g};${S};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:f}],dispatchGroup:{x:E},programUniforms:C}),getShaderSource:L}},sp=(e,t)=>{ip(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(ap(e.inputs,t)):e.compute(np(e.inputs,t))},op=e=>he(e)}),up,lp,dp,pp,cp,fp,hp,mp,gp,ng=M(()=>{"use strict";ee(),re(),ie(),up=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},lp=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
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
      `},dp=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
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
          `},pp=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
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
          `},cp=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
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
          `},fp=(e,t,r)=>{switch(r.mode){case 0:return lp(e,t,r.pads.length);case 1:return dp(e,t,r.pads.length);case 2:return pp(e,t,r.pads.length);case 3:return cp(e,t,r.pads.length);default:throw new Error("Invalid mode")}},hp=(e,t)=>{let r=B.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=B.size(r),a=[{type:12,data:n},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;t.mode===0&&a.push({type:o?e[2].dataType:1,data:t.value}),a.push(...Z(e[0].dims,r));let u=["rank"],l=p=>{let f=j("output",e[0].dataType,r.length),m=N("x",e[0].dataType,i.length),g=m.type.value,_=fp(f,i.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:o?g:"f32"}),`
            ${p.registerUniforms(y).declareVariables(m,f)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(r)/64)},programUniforms:a}),getShaderSource:l}},mp=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,a=new Int32Array(2*n).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)a[Number(u[l])]=Number(r[l]),a[Number(u[l])+n]=Number(r[l+u.length])}else r.forEach((u,l)=>a[Number(l)]=Number(u));let o=[];return a.forEach(u=>o.push(u)),{mode:t.mode,value:i,pads:o}}else return t},gp=(e,t)=>{up(e.inputs);let r=mp(e.inputs,t);e.compute(hp(e.inputs,r),{inputs:[0]})}}),dr,zn,An,On,Bn,yp,_p,Rn,Nn,wp,$p,Dn,bp,vp,Mn,xp,Sp,kp,Tp,ag=M(()=>{"use strict";Me(),ee(),re(),ie(),dr=e=>{if(we.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},zn=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let a=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),u=t.strides.slice(),l=a?t.dilations.slice():[],p=t.pads.slice();Er.adjustPoolAttributes(r,n,o,u,l,p);let f=Er.computePoolOutputShape(r,n,u,l,o,p,t.autoPad,t.ceilMode),m=Object.assign({},t);a?Object.assign(m,{kernelShape:o,strides:u,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(m,{kernelShape:o,strides:u,pads:p,cacheKey:t.cacheKey});let g=f.slice();return g.push(g.splice(1,1)[0]),[m,i?g:f]},An=(e,t)=>{let r=t.format==="NHWC",i=B.size(e),n=B.size(t.kernelShape),a=[{type:12,data:i},{type:12,data:n}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],m=!!(p+f);a.push({type:12,data:u},{type:12,data:l},{type:12,data:p},{type:12,data:f}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],x=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];g=!!(x+S),a.push({type:12,data:_},{type:12,data:y},{type:12,data:x},{type:12,data:S}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,o,!0,m,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=B.computeStrides(t.kernelShape);a.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,f)=>p+f);return[a,o,!!l,!1,!1]}},On=(e,t,r,i,n,a,o,u,l,p,f,m)=>{let g=n.format==="NHWC",_=t.type.value,y=j("output",t.type.tensor,i);if(n.kernelShape.length<=2){let x="",S="",$="",w=r-(g?2:1);if(f?x=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:x=`
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
              ${x}
              ${$}
              ${o}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let x=n.kernelShape.length,S=n.pads.length,$="";return p?$=`
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

              var offsets: array<u32, ${x}>;

              var value = ${_}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${x-1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides","j",x)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides","j",x)};
                }
                offsets[${x-1}] = offset;

                isPad = false;
                for (var j = ${r-x}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides",`j - ${r-x}u`,x)}
                    + offsets[j - ${r-x}u] - ${K("uniforms.pads","j - 2u",S)};
                  ${$}
              }
              ${o}

              output[global_idx] = value;
            }`}},Bn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,yp=e=>`${Bn(e)};${e.countIncludePad}`,_p=e=>`${Bn(e)};${e.storageOrder};${e.dilations}`,Rn=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Nn=(e,t,r,i)=>{let[n,a]=zn(t,i,r),o=N("x",t.dataType,t.dims.length),u=o.type.value,l="value += x_val;",p="";n.countIncludePad?p+=`value /= ${u}(uniforms.kernelSize);`:p+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[f,m,g,_,y]=An(a,n);f.push(...Z(t.dims,a));let x=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${g};${_};${y}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(a)/64)},programUniforms:f}),getShaderSource:S=>On(S,o,t.dims.length,a.length,n,l,p,0,m,g,_,y)}},wp=e=>{let t=e.count_include_pad!==0,r=Rn(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:yp(i)}},$p=(e,t)=>{dr(e.inputs),e.compute(Nn("AveragePool",e.inputs[0],!1,t))},Dn={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},bp=e=>{let t=e.format;return{format:t,...Dn,cacheKey:t}},vp=(e,t)=>{dr(e.inputs),e.compute(Nn("GlobalAveragePool",e.inputs[0],!0,t))},Mn=(e,t,r,i)=>{let[n,a]=zn(t,i,r),o=`
      value = max(x_val, value);
    `,u="",l=N("x",t.dataType,t.dims.length),p=["rank"],[f,m,g,_,y]=An(a,n);return f.push(...Z(t.dims,a)),{name:e,shaderCache:{hint:`${i.cacheKey};${g};${_};${y}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(a)/64)},programUniforms:f}),getShaderSource:x=>On(x,l,t.dims.length,a.length,n,o,u,t.dataType===10?-65504:-1e5,m,g,_,y)}},xp=(e,t)=>{dr(e.inputs),e.compute(Mn("MaxPool",e.inputs[0],!1,t))},Sp=e=>{let t=e.storage_order,r=e.dilations,i=Rn(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:_p(n)}},kp=e=>{let t=e.format;return{format:t,...Dn,cacheKey:t}},Tp=(e,t)=>{dr(e.inputs),e.compute(Mn("GlobalMaxPool",e.inputs[0],!0,t))}}),Ip,Ep,Cp,zp,sg=M(()=>{"use strict";ee(),re(),$e(),ie(),Ip=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,a)=>a===t.axis||n===e[0].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Ep=(e,t)=>{let r=B.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,a=e[0].dims,o=e[1].dataType,u=B.size(a),l=i===3||i===2,p=l?[Math.ceil(B.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,m=e.length>2?e[2]:void 0,g=m?l?[Math.ceil(B.size(m.dims)/4)]:m.dims:void 0,_=f.length===0||f.length===1&&f[0]===1,y=_===!1&&f.length===1,x=be(u),S=_&&(!l||x===4),$=S?x:1,w=S&&!l?x:1,T=N("input",l?12:i,p.length,w),I=N("scale",o,f.length),E=m?N("zero_point",l?12:i,g.length):void 0,C=j("output",o,a.length,$),A=[T,I];E&&A.push(E);let v=[p,f];m&&v.push(g);let D=[{type:12,data:u/$},{type:12,data:r},{type:12,data:t.blockSize},...Z(...v,a)],L=X=>{let Q=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${X.registerUniforms(Q).declareVariables(...A,C)}
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
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:L,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(u/$/64),y:1,z:1},programUniforms:D})}},Cp=(e,t)=>{Ip(e.inputs,t),e.compute(Ep(e.inputs,t))},zp=e=>he({axis:e.axis,blockSize:e.blockSize})}),Ap,Op,Bp,og=M(()=>{"use strict";Me(),ee(),ie(),Ap=(e,t,r)=>{let i=e===t,n=e<t&&r<0,a=e>t&&r>0;if(i||n||a)throw new Error("Range these inputs' contents are invalid.")},Op=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),a=[n],o=n,u=[{type:12,data:o},{type:i,data:e},{type:i,data:r},...Z(a)],l=p=>{let f=j("output",i,a.length),m=f.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:m},{name:"delta",type:m}];return`
        ${p.registerUniforms(g).declareVariables(f)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${m}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u})}},Bp=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),we.webgpu.validateInputContent&&Ap(t,r,i),e.compute(Op(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),Rp,Np,Dp,Mp,ug=M(()=>{"use strict";ee(),re(),$e(),ie(),Rp=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
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
                ${n}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${a}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Np=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,a=1,o=Math.ceil(B.sizeToDimension(i,i.length-1)/a),u=i[i.length-1],l=B.sizeFromDimension(r,u),p=[{type:12,data:o},{type:12,data:u},{type:12,data:l},...Z(e[1].dims,e[2].dims,n)],f=m=>{let g=N("indices",e[1].dataType,e[1].dims.length),_=N("updates",e[2].dataType,e[2].dims.length,a),y=t.reduction!=="none"&&t.reduction!==""?Ns("output",e[0].dataType,n.length):j("output",e[0].dataType,n.length,a);return`
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
    ${Rp(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:f}},Dp=e=>he({reduction:e.reduction}),Mp=(e,t)=>{e.compute(Np(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Up,Pp,Lp,Un,qp,Wp,Vp,Gp,Hp,Fp,jp,Kp,Pn,Zp,Qp,Xp,Yp,Jp,ec,tc,lg=M(()=>{"use strict";ee(),re(),$e(),ie(),Up=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Pp=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,a)=>i[n]=e[a]),i},Lp=(e,t,r,i,n,a)=>{let[o,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(f=>a.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(f=>i.push(f)),i.length!==0&&i.length!==p&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Up(i,t),t.axes.length>0&&Pp(i,t.axes,p).forEach((f,m)=>i[m]=f)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(f=>n.push(Number(f))),n.length!==0&&n.length!==p&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},Un=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,qp=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Un("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Un("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Wp=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Vp=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((a,o)=>{i[a]=n[o],i[o+r]=n[t.length+o]}),i):n},Gp=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(a=>n.push(a)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((a,o)=>n[a]=r[o])}else r.forEach(a=>n.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((a,o)=>Math.round(a*t[o]))}return n},Hp=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=i),r.axes.forEach(a=>n[a]=Math.round(e[a]*t[a]))):(t.fill(i,0,t.length),n.forEach((a,o)=>n[o]=Math.round(a*t[o]))),n},Fp=(e,t,r,i,n)=>`
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
    }`,jp=(e,t,r,i,n,a,o)=>`
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
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,Kp=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Pn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Zp=(e,t,r,i,n)=>{let[a,o,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${Pn(e,l,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${o}];
      var col:${p} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[o]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[o]} - 1));
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
    }`},Qp=(e,t,r,i,n,a,o,u,l,p)=>{let f=r.length===2,m=!0,[g,_]=f?[0,1]:m?[2,3]:[1,2],y=e.type.value,x=S=>{let $=S===g?"row":"col";return`
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
    ${x(g)};
    ${x(_)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
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
    `},Xp=(e,t,r,i,n)=>{let[a,o,u,l,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${Pn(e,p,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${o}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[o]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[o]} - 1));
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

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
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
    }`},Yp=(e,t,r,i,n,a)=>{let o=e.dims,u=Vp(a,t.axes,o.length),l=Gp(o,i,n,t.axes),p=i.slice();i.length===0&&(p=o.map((w,T)=>w===0?1:l[T]/w),t.keepAspectRatioPolicy!=="stretch"&&(l=Hp(o,p,t)));let f=j("output",e.dataType,l.length),m=N("input",e.dataType,o.length),g=B.size(l),_=o.length===l.length&&o.every((w,T)=>w===l[T]),y=t.coordinateTransformMode==="tf_crop_and_resize",x=t.extrapolationValue,S=m.type.value,$=w=>`
      ${_?"":`
      ${qp(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Kp(m,o)};
              ${Wp(t.nearestMode,r,S)};
              ${jp(m,f,o,l,p.length,u.length,y)};
              `;case"linear":return`
              ${Fp(f,o,l,p.length,u.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${Zp(m,f,o,y,x)}`;if(o.length===3||o.length===5)return`${Xp(m,f,o,y,x)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(o.length===2||o.length===4)return`${Qp(m,f,o,l,p,u,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",u.length).declareVariables(m,f)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${m.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${m.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${o.length===2||o.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${n.length>0?n:""}|${u.length>0?u:""}|${_}|${t.mode==="nearest"?o.length:o}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:p},{type:1,data:u},...Z(o,l)]})}},Jp=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},ec=(e,t)=>{let r=[],i=[],n=[],a=Jp(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Lp(e.inputs,t,a,r,i,n),e.compute(Yp(e.inputs[0],t,a,r,i,n),{inputs:[0]})},tc=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,a=e.excludeOutside!==0,o=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return he({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:a,extrapolationValue:o,keepAspectRatioPolicy:u,mode:l,nearestMode:p})}}),rc,ic,nc,dg=M(()=>{"use strict";ee(),re(),ie(),rc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let o=e[3];if(o.dims.length!==1)throw new Error("Beta must be 1D");if(o.dims[o.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let o=e[4];if(o.dims.length!==1)throw new Error("Bias must be 1D");if(o.dims[o.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},ic=(e,t,r,i)=>{let n=t.simplified,a=e[0].dims,o=B.size(a),u=a,l=o,p=a.slice(-1)[0],f=i?a.slice(0,-1).concat(1):[],m=!n&&e.length>3,g=e.length>4,_=i&&r>1,y=i&&r>2,x=r>3,S=64,$=be(p),w=[{type:12,data:l},{type:12,data:$},{type:12,data:p},{type:1,data:t.epsilon}],T=E=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[N("x",e[0].dataType,e[0].dims,$),N("skip",e[1].dataType,e[1].dims,$),N("gamma",e[2].dataType,e[2].dims,$)];m&&A.push(N("beta",e[3].dataType,e[3].dims,$)),g&&A.push(N("bias",e[4].dataType,e[4].dims,$)),A.push(j("output",e[0].dataType,u,$)),_&&A.push(j("mean_output",1,f)),y&&A.push(j("inv_std_output",1,f)),x&&A.push(j("input_skip_bias_sum",e[0].dataType,u,$));let v=Ee(e[0].dataType),D=Ee(1,$);return`

      ${E.registerUniforms(C).declareVariables(...A)}
      var<workgroup> sum_shared : array<${D}, ${S}>;
      var<workgroup> sum_squared_shared : array<${D}, ${S}>;

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
          let bias_value = ${g?"bias[offset1d + i]":v+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${x?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Kt(v,$,"value")};
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
        let mean = ${ft("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${ft("square_sum",$)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${v}(mean)`}) *
            ${v}(inv_std_dev) * gamma[offset1d + i]
            ${m?"+ beta[offset1d + i]":""};
        }
      }`},I=[{dims:u,dataType:e[0].dataType}];return r>1&&I.push({dims:f,dataType:1}),r>2&&I.push({dims:f,dataType:1}),r>3&&I.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${_};${y};${x}`,inputDependencies:e.map((E,C)=>"type")},getShaderSource:T,getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:w})}},nc=(e,t)=>{rc(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(ic(e.inputs,t,e.outputCount,!1),{outputs:r})}}),ac,pr,sc,Ln,oc,uc,lc,dc,pg=M(()=>{"use strict";ee(),re(),$e(),ie(),ac=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},pr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},sc=(e,t)=>{if(e.length>1){let r=pr(e,1),i=pr(e,2),n=pr(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),he({starts:r,ends:i,axes:n})}else return t},Ln=(e,t,r,i,n)=>{let a=e;return e<0&&(a+=r[i[t]]),n[t]<0?Math.max(0,Math.min(a,r[i[t]]-1)):Math.max(0,Math.min(a,r[i[t]]))},oc=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,uc=(e,t)=>{let r=e[0].dims,i=B.size(r),n=t.axes.length>0?B.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=pr(e,4);a.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(n.length).fill(1));let o=t.starts.map(($,w)=>Ln($,w,r,n,a)),u=t.ends.map(($,w)=>Ln($,w,r,n,a));if(n.length!==o.length||n.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let $=0;$<r.length;++$)n.includes($)||(o.splice($,0,0),u.splice($,0,r[$]),a.splice($,0,1));let l=a.map($=>Math.sign($));a.forEach(($,w,T)=>{if($<0){let I=(u[w]-o[w])/$,E=o[w],C=E+I*a[w];o[w]=C,u[w]=E,T[w]=-$}});let p=r.slice(0);n.forEach(($,w)=>{p[$]=Math.ceil((u[$]-o[$])/a[$])});let f={dims:p,dataType:e[0].dataType},m=j("output",e[0].dataType,p.length),g=N("input",e[0].dataType,e[0].dims.length),_=B.size(p),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],x=[{type:12,data:_},{type:12,data:o},{type:6,data:l},{type:12,data:a},...Z(e[0].dims,p)],S=$=>`
      ${$.registerUniforms(y).declareVariables(g,m)}
        ${oc(g,m,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${m.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${m.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${o.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:x})}},lc=(e,t)=>{ac(e.inputs,t);let r=sc(e.inputs,t);e.compute(uc(e.inputs,r),{inputs:[0]})},dc=e=>{let t=e.starts,r=e.ends,i=e.axes;return he({starts:t,ends:r,axes:i})}}),pc,cc,fc,hc,cg=M(()=>{"use strict";ee(),re(),$e(),ht(),ie(),pc=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},cc=(e,t)=>{let r=e.inputs[0],i=r.dims,n=B.size(i),a=i.length,o=B.normalizeAxis(t.axis,a),u=o<i.length-1,l,p=[];u?(p=Array.from({length:a},(A,v)=>v),p[o]=a-1,p[a-1]=o,l=e.compute(Pe(r,p),{inputs:[r],outputs:[-1]})[0]):l=r;let f=l.dims,m=f[a-1],g=n/m,_=be(m),y=m/_,x=64;g===1&&(x=256);let S=(A,v)=>v===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:v===2?`max(${A}.x, ${A}.y)`:v===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,$=N("x",l.dataType,l.dims,_),w=j("result",l.dataType,l.dims,_),T=$.type.value,I=Ee(l.dataType)==="f32"?`var threadMax = ${T}(-3.4028234663852886e+38f);`:`var threadMax = ${T}(-65504.0h);`,E=A=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${x}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols","i32").declareVariables($,w)}
      ${A.mainStart(x)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${x};
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
          rowSumShared = ${T}(${ft("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${_};${x}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:l.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:y}]}),getShaderSource:E},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Pe(C,p),{inputs:[C]})},fc=(e,t)=>{pc(e.inputs),cc(e,t)},hc=e=>he({axis:e.axis})}),qn,mc,gc,yc,_c,fg=M(()=>{"use strict";ee(),re(),ie(),qn=e=>Array.from(e.getBigInt64Array(),Number),mc=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(qn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},gc=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},yc=(e,t)=>{let r=e[0].dims,i=t??qn(e[1]),n=gc(r,i),a=B.size(n),o=e[0].dataType,u=N("input",o,r.length),l=j("output",o,n.length),p=f=>`
      const inputShape = ${u.indices(...r)};
      ${f.registerUniform("output_size","u32").declareVariables(u,l)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...Z(e[0].dims,n)]}),getShaderSource:p}},_c=e=>{mc(e.inputs),e.compute(yc(e.inputs),{inputs:[0]})}}),wc,$c,bc,hg=M(()=>{"use strict";ee(),re(),ie(),wc=(e,t,r,i,n)=>{let a=j("output_data",n,r.length,4),o=N("a_data",t[1].dataType,t[1].dims.length,4),u=N("b_data",t[2].dataType,t[2].dims.length,4),l=N("c_data",t[0].dataType,t[0].dims.length,4),p,f=(m,g,_)=>`select(${g}, ${m}, ${_})`;if(!i)p=a.setByOffset("global_idx",f(o.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let m=(g,_,y="")=>{let x=`a_data[index_a${_}][component_a${_}]`,S=`b_data[index_b${_}][component_b${_}]`,$=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${a.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${o.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_b${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_c${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${g}[${_}] = ${y}(${f(x,S,$)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(l,o,u,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},$c=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,a=!(B.areEqual(t,r)&&B.areEqual(r,i)),o=t,u=B.size(t);if(a){let p=Ft.calcShape(Ft.calcShape(t,r,!1),i,!1);if(!p)throw new Error("Can't perform where op on the given tensors");o=p,u=B.size(o)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>wc(p,e,o,a,n),getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...Z(i,t,r,o)]})}},bc=e=>{e.compute($c(e.inputs))}}),vc,mg=M(()=>{"use strict";Em(),Xi(),Cm(),zm(),Am(),Om(),Bm(),Um(),Lm(),qm(),Wm(),Vm(),Gm(),Hm(),Fm(),jm(),Km(),Zm(),Qm(),Xm(),Ym(),Jm(),eg(),tg(),rg(),ig(),Rd(),ng(),ag(),sg(),og(),ug(),Ki(),lg(),Gd(),dg(),pg(),cg(),qd(),fg(),ht(),tn(),hg(),vc=new Map([["Abs",[Zo]],["Acos",[Qo]],["Acosh",[Xo]],["Add",[Pu]],["ArgMax",[Ro,Qi]],["ArgMin",[Bo,Qi]],["Asin",[Yo]],["Asinh",[Jo]],["Atan",[eu]],["Atanh",[tu]],["Attention",[Lo]],["AveragePool",[$p,wp]],["BatchNormalization",[Go]],["BiasAdd",[jo]],["BiasSplitGelu",[Du]],["Cast",[iu,ru]],["Ceil",[su]],["Clip",[au]],["Concat",[Xu,Yu]],["Conv",[mn,fn]],["ConvTranspose",[kl,vl]],["Cos",[ou]],["Cosh",[uu]],["CumSum",[Il,El]],["DepthToSpace",[Ol,Bl]],["DequantizeLinear",[Cp,zp]],["DFT",[Ll,ql]],["Div",[Lu]],["Einsum",[jl,Kl]],["Elu",[lu,nr]],["Equal",[qu]],["Erf",[du]],["Exp",[pu]],["Expand",[Yl]],["FastGelu",[ed]],["Floor",[cu]],["FusedConv",[mn,fn]],["Gather",[nd,id]],["GatherElements",[md,hd]],["GatherBlockQuantized",[dd,pd]],["GatherND",[sd,od]],["Gelu",[fu]],["Gemm",[wd,_d]],["GlobalAveragePool",[vp,bp]],["GlobalMaxPool",[Tp,kp]],["Greater",[Hu]],["GreaterOrEqual",[ju]],["GridSample",[Ed,Cd]],["GroupQueryAttention",[Kd]],["HardSigmoid",[bu,$u]],["HardSwish",[vu]],["InstanceNormalization",[Xd]],["LayerNormalization",[ep]],["LeakyRelu",[hu,nr]],["Less",[Fu]],["LessOrEqual",[Ku]],["Log",[zu]],["MatMul",[rp]],["MatMulNBits",[sp,op]],["MaxPool",[xp,Sp]],["Mul",[Wu]],["MultiHeadAttention",[Bd,Ad]],["Neg",[gu]],["Not",[mu]],["Pad",[gp]],["Pow",[Vu]],["QuickGelu",[Bu,nr]],["Range",[Bp]],["Reciprocal",[yu]],["ReduceMin",[Eo]],["ReduceMean",[xo]],["ReduceMax",[Io]],["ReduceSum",[zo]],["ReduceProd",[Co]],["ReduceL1",[So]],["ReduceL2",[ko]],["ReduceLogSum",[Oo]],["ReduceLogSumExp",[To]],["ReduceSumSquare",[Ao]],["Relu",[_u]],["Resize",[ec,tc]],["RotaryEmbedding",[Vd]],["ScatterND",[Mp,Dp]],["Sigmoid",[wu]],["Sin",[xu]],["Sinh",[Su]],["Slice",[lc,dc]],["SkipLayerNormalization",[nc]],["Split",[Pd,Ld]],["Sqrt",[ku]],["Softmax",[fc,hc]],["Sub",[Gu]],["Tan",[Tu]],["Tanh",[Iu]],["ThresholdedRelu",[Cu,nr]],["Tile",[_c]],["Transpose",[Vs,Gs]],["Where",[bc]]])}),xc,gg=M(()=>{"use strict";Me(),ut(),ie(),xc=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){Le(e.programInfo.name);let a=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of r)u.push({binding:u.length,resource:{buffer:p.buffer}});n&&u.push({binding:u.length,resource:n});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}o.setPipeline(e.computePipeline),o.setBindGroup(0,l),o.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ne(e.programInfo.name)}dispose(){}build(e,t){Le(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{r.features.has(p.feature)&&i.push(`enable ${p.extension};`)});let n=Ms(t,this.backend.device.limits),a=e.getShaderSource(n),o=`${i.join(`
`)}
${n.additionalImplementations}
${a}`,u=r.createShaderModule({code:o,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Ne(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let a=t*r*i,o=Math.ceil(Math.sqrt(a));if(o>n){if(o=Math.ceil(Math.cbrt(a)),o>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}else return[o,o,1]}}}),Sc={};Vt(Sc,{WebGpuBackend:()=>Ec});var kc,Tc,Ic,Ec,yg=M(()=>{"use strict";Me(),ee(),ut(),vs(),Tm(),mg(),gg(),kc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let a=e[i].dims.length;r.push(`${n};${a}`);break}case"dims":{let a=e[i].dims.join(",");r.push(`${n};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Tc=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${kc(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Ic=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Ec=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=u=>t.features.has(u)&&r.push(u)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i);let a=t,o=t.info??(typeof a.requestAdapterInfo=="function"?await a.requestAdapterInfo():void 0);this.adapterInfo=new Ic(o),this.gpuDataManager=Bs(this),this.programManager=new xc(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Oi(e.logLevel,!!e.debug),this.device.onuncapturederror=u=>{u.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${u.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Le(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let n=r[i],a=n.kernelId,o=this.kernels.get(a),u=o.kernelType,l=o.kernelName,p=n.programName,f=n.inputTensorViews,m=n.outputTensorViews,g=t[i*2],_=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let y=Number(g-this.queryTimeBase),x=Number(_-this.queryTimeBase);if(!Number.isSafeInteger(y)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(S=>({dims:S.dims,dataType:ot(S.dataType)})),outputsMetadata:m.map(S=>({dims:S.dims,dataType:ot(S.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:p,startTime:y,endTime:x});else{let S="";f.forEach((w,T)=>{S+=`input[${T}]: [${w.dims}] | ${ot(w.dataType)}, `});let $="";m.forEach((w,T)=>{$+=`output[${T}]: [${w.dims}] | ${ot(w.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${p}" ${S}${$}start time: ${y} ns, execution time: ${x-y} ns`)}$r("GPU",`${p}::${g}::${_}`)}e.unmap(),this.pendingQueries.delete(e)}),Ne()}run(e,t,r,i,n,a){Le(e.name);let o=[];for(let w=0;w<t.length;++w){let T=t[w].data;if(T===0)continue;let I=this.gpuDataManager.get(T);if(!I)throw new Error(`no GPU data for input: ${T}`);o.push(I)}let{outputs:u,dispatchGroup:l,programUniforms:p}=e.getRunData(t),f=r.length===0?u.map((w,T)=>T):r;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let m=[],g=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(f[w])||f[w]<-3||f[w]>=a)throw new Error(`Invalid output index: ${f[w]}`);if(f[w]===-3)continue;let T=f[w]===-1,I=f[w]===-2,E=T||I?n(u[w].dataType,u[w].dims):i(f[w],u[w].dataType,u[w].dims);if(m.push(E),E.data===0)continue;let C=this.gpuDataManager.get(E.data);if(!C)throw new Error(`no GPU data for output: ${E.data}`);if(T&&this.temporaryData.push(C),I){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(C)}g.push(C)}if(o.length!==t.length||g.length!==m.length){if(g.length===0)return Ne(e.name),m;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let _;if(p){let w=0,T=[];p.forEach(A=>{let v=typeof A.data=="number"?[A.data]:A.data;if(v.length===0)return;let D=A.type===10?2:4,L,X;A.type===10?(X=v.length>4?16:v.length>2?8:v.length*D,L=v.length>4?16:D*v.length):(X=v.length<=2?v.length*D:16,L=16),w=Math.ceil(w/X)*X,T.push(w);let Q=A.type===10?8:4;w+=v.length>4?Math.ceil(v.length/Q)*L:v.length*D});let I=16;w=Math.ceil(w/I)*I;let E=new ArrayBuffer(w);p.forEach((A,v)=>{let D=T[v],L=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(E,D,L.length).set(L);else if(A.type===12)new Uint32Array(E,D,L.length).set(L);else if(A.type===10)new Uint16Array(E,D,L.length).set(L);else if(A.type===1)new Float32Array(E,D,L.length).set(L);else throw new Error(`Unsupported uniform type: ${ot(A.type)}`)});let C=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,E,0,w),this.gpuDataManager.release(C.id),_={offset:0,size:w,buffer:C.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),x=y[1]===1&&y[2]===1,S=Tc(e,t,x),$=this.programManager.getArtifact(S);if($||($=this.programManager.build(e,y),this.programManager.setArtifact(S,$),de("info",()=>`[artifact] key: ${S}, programName: ${e.name}`)),p&&$.uniformVariablesInfo){if(p.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${p.length} in program "${$.programInfo.name}".`);for(let w=0;w<p.length;w++){let T=p[w],I=T.type,E=typeof T.data=="number"?1:T.data.length,[C,A]=$.uniformVariablesInfo[w];if(I!==C||E!==A)throw new Error(`Uniform variable ${w} mismatch: expect type ${C} with size ${A}, got type ${I} with size ${E} in program "${$.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${S}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:m};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run($,o,g,y,_),Ne(e.name),m}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=vc.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,a=i.kernelName,o=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${n}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),o(t,u[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${a}" failed. ${p}`)),1}finally{l&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${n}] ${a}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let a=n.get(t),o=this.gpuDataManager.registerExternalBuffer(r,i,a);return n.set(t,[o,r]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Vi(this,e,t);return Bi(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),a=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(a.computePipeline),n.setBindGroup(0,a.bindGroup),n.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Cc={};Vt(Cc,{init:()=>Ac});var qr,zc,Ac,_g=M(()=>{"use strict";ee(),ut(),re(),km(),qr=class tm{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(B.size(t)!==B.size(this.dims))throw new Error("Invalid new shape");return new tm(this.module,this.dataType,this.data,t)}},zc=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceLimits=t.device.limits;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,a=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,a));let o=Number(e.getValue(i*n++,a));this.outputCount=Number(e.getValue(i*n++,a)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,a));let u=[];for(let l=0;l<o;l++){let p=Number(e.getValue(i*n++,a)),f=Number(e.getValue(i*n++,"*")),m=Number(e.getValue(i*n++,a)),g=[];for(let _=0;_<m;_++)g.push(Number(e.getValue(i*n++,a)));u.push(new qr(e,p,f,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(o=>typeof o=="number"?this.inputs[o]:o)??this.inputs,i=t?.outputs??[],n=(o,u,l)=>new qr(this.module,u,this.output(o,l),l),a=(o,u)=>{let l=Ct(o,u);if(!l)throw new Error(`Unsupported data type: ${o}`);let p=l>0?this.backend.gpuDataManager.create(l).id:0;return new qr(this.module,o,p,u)};return this.backend.run(e,r,i,n,a,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,n);for(let o=0;o<t.length;o++)this.module.setValue(a+i*(o+1),t[o],n);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Ac=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(yg(),Yt(Sc)).WebGpuBackend,o=new a;await o.initialize(r,i),n("webgpu",[o,u=>o.alloc(Number(u)),u=>o.free(u),(u,l,p,f=!1)=>{if(f)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(p)}`),o.memcpy(Number(u),Number(l));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let m=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(p));o.upload(Number(l),m)}},async(u,l,p)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${p}`),await o.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(u,l,p)=>o.createKernel(u,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>o.releaseKernel(u),(u,l,p,f)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${l}`);let m=new zc(t,o,Number(l));return o.computeKernel(Number(u),m,f)},()=>o.captureBegin(),()=>o.captureEnd(),()=>o.replay()])}else{let a=new Cs(r);n("webnn",[a,()=>a.reserveTensorId(),o=>a.releaseTensorId(o),async(o,u,l,p,f)=>a.ensureTensor(o,u,l,p,f),(o,u)=>{a.uploadTensor(o,u)},async(o,u)=>a.downloadTensor(o,u),(o,u)=>a.registerMLContext(o,u),!!r.trace])}}}),Oc,Wn,Vn,gt,Bc,Gn,Wr,Hn,Fn,cr,Rc,Dt,Nc,Dc,jn,Kn,Zn,Qn,Mc=M(()=>{"use strict";Me(),vm(),xm(),ee(),Tt(),Ii(),Ai(),Oc=(e,t)=>{me()._OrtInit(e,t)!==0&&pe("Can't initialize onnxruntime.")},Wn=async e=>{Oc(e.wasm.numThreads,Tr(e.logLevel))},Vn=async(e,t)=>{me().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:n}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(_g(),Yt(Cc)).init;t==="webgpu"&&await i("webgpu",me(),e,r),t==="webnn"&&await i("webnn",me(),e)}},gt=new Map,Bc=e=>{let t=me(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&pe("Can't get session input/output count.");let a=i===4?"i32":"i64";return[Number(t.getValue(n,a)),Number(t.getValue(n+i,a))]}finally{t.stackRestore(r)}},Gn=(e,t)=>{let r=me(),i=r.stackSave(),n=0;try{let a=r.PTR_SIZE,o=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,o,o+a)!==0&&pe("Can't get session input/output metadata.");let u=Number(r.getValue(o,"*"));n=Number(r.getValue(o+a,"*"));let l=r.HEAP32[n/4];if(l===0)return[u,0];let p=r.HEAPU32[n/4+1],f=[];for(let m=0;m<p;m++){let g=Number(r.getValue(n+8+m*a,"*"));f.push(g!==0?r.UTF8ToString(g):Number(r.getValue(n+8+(m+p)*a,"*")))}return[u,l,f]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},Wr=e=>{let t=me(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Hn=async(e,t)=>{let r,i,n=me();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=Wr(e);let a=0,o=0,u=0,l=[],p=[],f=[];try{if([o,l]=await cs(t),t?.externalData&&n.mountExternalData){let I=[];for(let E of t.externalData){let C=typeof E=="string"?E:E.path,A=typeof E=="string"?E:E.data;I.push(Ir(A).then(v=>{n.mountExternalData(C,v)}))}await Promise.all(I)}for(let I of t?.executionProviders??[])if((typeof I=="string"?I:I.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof I!="string"){let E=I,C=E?.context,A=E?.gpuDevice,v=E?.deviceType,D=E?.powerPreference;C?n.currentContext=C:A?n.currentContext=await n.webnnCreateMLContext(A):n.currentContext=await n.webnnCreateMLContext({deviceType:v,powerPreference:D})}else n.currentContext=await n.webnnCreateMLContext();break}a=await n._OrtCreateSession(r,i,o),n.webgpuOnCreateSession?.(a),a===0&&pe("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(a,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[m,g]=Bc(a),_=!!t?.enableGraphCapture,y=[],x=[],S=[],$=[],w=[];for(let I=0;I<m;I++){let[E,C,A]=Gn(a,I);E===0&&pe("Can't get an input name."),p.push(E);let v=n.UTF8ToString(E);y.push(v),S.push(C===0?{name:v,isTensor:!1}:{name:v,isTensor:!0,type:ot(C),shape:A})}for(let I=0;I<g;I++){let[E,C,A]=Gn(a,I+m);E===0&&pe("Can't get an output name."),f.push(E);let v=n.UTF8ToString(E);x.push(v),$.push(C===0?{name:v,isTensor:!1}:{name:v,isTensor:!0,type:ot(C),shape:A});{if(_&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let D=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[v]??"cpu",L=n.webnnIsGraphOutput;if(D==="cpu"&&L&&L(a,v)){w.push("ml-tensor-cpu-output");continue}if(D!=="cpu"&&D!=="cpu-pinned"&&D!=="gpu-buffer"&&D!=="ml-tensor")throw new Error(`Not supported preferred output location: ${D}.`);if(_&&D!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${D}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(D)}}let T=null;return w.some(I=>I==="gpu-buffer"||I==="ml-tensor"||I==="ml-tensor-cpu-output")&&(u=n._OrtCreateBinding(a),u===0&&pe("Can't create IO binding."),T={handle:u,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(I=>I==="ml-tensor-cpu-output"?"ml-tensor":I).map(I=>zi(I))}),gt.set(a,[a,p,f,T,_,!1]),[a,y,x,S,$]}catch(m){throw p.forEach(g=>n._OrtFree(g)),f.forEach(g=>n._OrtFree(g)),u!==0&&n._OrtReleaseBinding(u)!==0&&pe("Can't release IO binding."),a!==0&&n._OrtReleaseSession(a)!==0&&pe("Can't release session."),m}finally{n._free(r),o!==0&&n._OrtReleaseSessionOptions(o)!==0&&pe("Can't release session options."),l.forEach(m=>n._free(m)),n.unmountExternalData?.()}},Fn=e=>{let t=me(),r=gt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,a,o,u]=r;o&&(u&&t._OrtClearBoundOutputs(o.handle)!==0&&pe("Can't clear bound outputs."),t._OrtReleaseBinding(o.handle)!==0&&pe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(l=>t._OrtFree(l)),a.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&pe("Can't release session."),gt.delete(e)},cr=new Map,Rc=1,Dt=new Map,Nc=e=>{let t=me(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a LoRA adapter. failed to allocate a buffer of size ${e.byteLength}.`);try{t.HEAPU8.set(e,r);let i=t._OrtCreateLoraAdapter(r,e.byteLength);i===0&&pe("Can't create a LoRA adapter.");let n=Rc++;return cr.set(n,i),n}finally{t._free(r)}},Dc=e=>{let t=me(),r=cr.get(e);if(r===void 0)throw new Error(`cannot release LoRA adapter. invalid adapter id: ${e}`);if(Dt.has(e))throw new Error(`cannot release LoRA adapter. the adapter is used by a run in progress. adapter id: ${e}`);t._OrtReleaseLoraAdapter(r)!==0&&pe("Can't release LoRA adapter."),cr.delete(e)},jn=async(e,t,r,i,n,a,o=!1)=>{if(!e){t.push(0);return}let u=me(),l=u.PTR_SIZE,p=e[0],f=e[1],m=e[3],g=m,_,y;if(p==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(o&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let $=e[2].gpuBuffer;y=Ct(Et(p),f);{let w=u.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=w(i,a,$,y)}}else if(m==="ml-tensor"){let $=e[2].mlTensor;y=Ct(Et(p),f);let w=u.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=w(i,$,Et(p),f)}else{let $=e[2];if(Array.isArray($)){y=l*$.length,_=u._malloc(y),r.push(_);for(let w=0;w<$.length;w++){if(typeof $[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);u.setValue(_+w*l,Ge($[w],r),"*")}}else{let w=u.webnnIsGraphInput,T=u.webnnIsGraphOutput;if(p!=="string"&&w&&T){let I=u.UTF8ToString(n);if(w(i,I)||T(i,I)){let E=Et(p);y=Ct(E,f),g="ml-tensor";let C=u.webnnCreateTemporaryTensor,A=u.webnnUploadTensor;if(!C||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let v=await C(i,E,f);A(v,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),_=v}else y=$.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,y),_)}else y=$.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,y),_)}}let x=u.stackSave(),S=u.stackAlloc(4*f.length);try{f.forEach((w,T)=>u.setValue(S+T*l,w,l===4?"i32":"i64"));let $=u._OrtCreateTensor(Et(p),_,y,S,f.length,zi(g));$===0&&pe(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push($)}finally{u.stackRestore(x)}},Kn=async(e,t,r,i,n,a,o=[])=>{let u=me(),l=u.PTR_SIZE,p=gt.get(e);if(!p)throw new Error(`cannot run inference. invalid session id: ${e}`);let f=p[0],m=p[1],g=p[2],_=p[3],y=p[4],x=p[5],S=[];if(o.length>0){if(_)throw new Error("LoRA adapters are not supported for a session that uses IO binding, e.g. when an output is preferred to be on GPU, or when the WebNN execution provider produces an output.");for(let O of o){let W=cr.get(O);if(W===void 0)throw new Error(`cannot run inference. invalid LoRA adapter id: ${O}`);S.push(W)}}let $=t.length,w=i.length,T=0,I=[],E=[],C=[],A=[],v=[],D=u.stackSave(),L=u.stackAlloc($*l),X=u.stackAlloc($*l),Q=u.stackAlloc(w*l),J=u.stackAlloc(w*l);try{for(let P of o)Dt.set(P,(Dt.get(P)??0)+1);[T,I]=os(a,S),xt("wasm prepareInputOutputTensor");for(let P=0;P<$;P++)await jn(r[P],E,A,e,m[t[P]],t[P],y);for(let P=0;P<w;P++)await jn(n[P],C,A,e,g[i[P]],$+i[P],y);St("wasm prepareInputOutputTensor");for(let P=0;P<$;P++)u.setValue(L+P*l,E[P],"*"),u.setValue(X+P*l,m[t[P]],"*");for(let P=0;P<w;P++)u.setValue(Q+P*l,C[P],"*"),u.setValue(J+P*l,g[i[P]],"*");if(_&&!x){let{handle:P,outputPreferredLocations:se,outputPreferredLocationsEncoded:ne}=_;if(m.length!==$)throw new Error(`input count from feeds (${$}) is expected to be always equal to model's input count (${m.length}).`);xt("wasm bindInputsOutputs");for(let te=0;te<$;te++){let U=t[te];await u._OrtBindInput(P,m[U],E[te])!==0&&pe(`Can't bind input[${te}] for session=${e}.`)}for(let te=0;te<w;te++){let U=i[te];n[te]?.[3]?(v.push(C[te]),u._OrtBindOutput(P,g[U],C[te],0)!==0&&pe(`Can't bind pre-allocated output[${te}] for session=${e}.`)):u._OrtBindOutput(P,g[U],0,ne[U])!==0&&pe(`Can't bind output[${te}] to ${se[te]} for session=${e}.`)}St("wasm bindInputsOutputs"),gt.set(e,[f,m,g,_,y,!0])}u.jsepOnRunStart?.(f),u.webnnOnRunStart?.(f);let O;_?O=await u._OrtRunWithBinding(f,_.handle,w,Q,T):O=await u._OrtRun(f,X,L,$,J,w,Q,T),O!==0&&pe("failed to call OrtRun().");let W=[],Y=[];xt("wasm ProcessOutputTensor");for(let P=0;P<w;P++){let se=Number(u.getValue(Q+P*l,"*"));if(se===C[P]||v.includes(C[P])){W.push(n[P]),se!==C[P]&&u._OrtReleaseTensor(se)!==0&&pe("Can't release tensor.");continue}let ne=u.stackSave(),te=u.stackAlloc(4*l),U=!1,H,F=0;try{u._OrtGetTensorData(se,te,te+l,te+2*l,te+3*l)!==0&&pe(`Can't access output tensor data on index ${P}.`);let V=l===4?"i32":"i64",Se=Number(u.getValue(te,V));F=u.getValue(te+l,"*");let Qe=u.getValue(te+l*2,"*"),Oe=Number(u.getValue(te+l*3,V)),Ie=[];for(let ve=0;ve<Oe;ve++)Ie.push(Number(u.getValue(Qe+ve*l,V)));u._OrtFree(Qe)!==0&&pe("Can't free memory for tensor dims.");let ke=Ie.reduce((ve,xe)=>ve*xe,1);H=ot(Se);let et=_?.outputPreferredLocations[i[P]];if(H==="string"){if(et==="gpu-buffer"||et==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ve=[];for(let xe=0;xe<ke;xe++){let Be=u.getValue(F+xe*l,"*"),ye=u.getValue(F+(xe+1)*l,"*"),mr=xe===ke-1?void 0:ye-Be;ve.push(u.UTF8ToString(Be,mr))}W.push([H,Ie,ve,"cpu"])}else if(et==="gpu-buffer"&&ke>0){let ve=u.jsepGetBuffer;if(!ve)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let xe=ve(F),Be=Ct(Se,ke);if(Be===void 0||!Ei(H))throw new Error(`Unsupported data type: ${H}`);U=!0,W.push([H,Ie,{gpuBuffer:xe,download:u.jsepCreateDownloader(xe,Be,H),dispose:()=>{u._OrtReleaseTensor(se)!==0&&pe("Can't release tensor.")}},"gpu-buffer"])}else if(et==="ml-tensor"&&ke>0){let ve=u.webnnEnsureTensor,xe=u.webnnIsGraphInputOutputTypeSupported;if(!ve||!xe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Ct(Se,ke)===void 0||!Ci(H))throw new Error(`Unsupported data type: ${H}`);if(!xe(e,H,!1))throw new Error(`preferredLocation "ml-tensor" for ${H} output is not supported by current WebNN Context.`);let Be=await ve(e,F,Se,Ie,!1);U=!0,W.push([H,Ie,{mlTensor:Be,download:u.webnnCreateMLTensorDownloader(F,H),dispose:()=>{u.webnnReleaseTensorId(F),u._OrtReleaseTensor(se)}},"ml-tensor"])}else if(et==="ml-tensor-cpu-output"&&ke>0){let ve=u.webnnCreateMLTensorDownloader(F,H)(),xe=W.length;U=!0,Y.push((async()=>{let Be=[xe,await ve];return u.webnnReleaseTensorId(F),u._OrtReleaseTensor(se),Be})()),W.push([H,Ie,[],"cpu"])}else{let ve=kr(H),xe=new ve(ke);new Uint8Array(xe.buffer,xe.byteOffset,xe.byteLength).set(u.HEAPU8.subarray(F,F+xe.byteLength)),W.push([H,Ie,xe,"cpu"])}}finally{u.stackRestore(ne),H==="string"&&F&&u._free(F),U||u._OrtReleaseTensor(se)}}_&&!y&&(u._OrtClearBoundOutputs(_.handle)!==0&&pe("Can't clear bound outputs."),gt.set(e,[f,m,g,_,y,!1]));for(let[P,se]of await Promise.all(Y))W[P][2]=se;return St("wasm ProcessOutputTensor"),W}finally{u.webnnOnRunEnd?.(f),u.stackRestore(D),E.forEach(O=>u._OrtReleaseTensor(O)),C.forEach(O=>u._OrtReleaseTensor(O)),A.forEach(O=>u._free(O)),T!==0&&u._OrtReleaseRunOptions(T),I.forEach(O=>u._free(O));for(let O of o){let W=Dt.get(O)-1;W===0?Dt.delete(O):Dt.set(O,W)}}},Zn=e=>{let t=me(),r=gt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&pe("Can't get an profile file name."),t._OrtFree(n)},Qn=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),Je,qe,Zt,fr,hr,Vr,Xn,Gr,Mt,Ut,Uc,Pc,Lc,qc,Wc,Vc,Gc,Hc,Fc,jc,Yn=M(()=>{"use strict";Me(),Mc(),Tt(),xi(),Ai(),Je=()=>!!we.wasm.proxy&&typeof document<"u",Zt=!1,fr=!1,hr=!1,Gr=new Map,Mt=(e,t)=>{let r=Gr.get(e);r?r.push(t):Gr.set(e,[t])},Ut=()=>{if(Zt||!fr||hr||!qe)throw new Error("worker not ready")},Uc=e=>{switch(e.data.type){case"init-wasm":Zt=!1,e.data.err?(hr=!0,Xn[1](e.data.err)):(fr=!0,Xn[0]()),Vr&&(URL.revokeObjectURL(Vr),Vr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Gr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Pc=async()=>{if(!fr){if(Zt)throw new Error("multiple calls to 'initWasm()' detected.");if(hr)throw new Error("previous call to 'initWasm()' failed.");if(Zt=!0,Je())return new Promise((e,t)=>{qe?.terminate(),rs().then(([r,i])=>{try{qe=i,qe.onerror=a=>t(a),qe.onmessage=Uc,Xn=[e,t];let n={type:"init-wasm",in:we};!n.in.wasm.wasmPaths&&(r||wi)&&(n.in.wasm.wasmPaths={wasm:new URL("/pixcuro/assets/ort-wasm-simd-threaded.jsep-Dt5UNR3U.wasm",self.location.href).href}),qe.postMessage(n),Vr=r}catch(n){t(n)}},t)});try{await Ti(we.wasm),await Wn(we),fr=!0}catch(e){throw hr=!0,e}finally{Zt=!1}}},Lc=async e=>{if(Je())return Ut(),new Promise((t,r)=>{Mt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:we}};qe.postMessage(i)});await Vn(we,e)},qc=async e=>Je()?(Ut(),new Promise((t,r)=>{Mt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};qe.postMessage(i,[e.buffer])})):Wr(e),Wc=async(e,t)=>{if(Je()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ut(),new Promise((r,i)=>{Mt("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),qe.postMessage(n,a)})}else return Hn(e,t)},Vc=async e=>{if(Je())return Ut(),new Promise((t,r)=>{Mt("release",[t,r]);let i={type:"release",in:e};qe.postMessage(i)});Fn(e)},Gc=async e=>{if(Je())throw new Error("LoRA adapter is not supported for proxy.");let t=typeof e=="string"?await Ir(e):e;return Nc(t)},Hc=async e=>{if(Je())throw new Error("LoRA adapter is not supported for proxy.");Dc(e)},Fc=async(e,t,r,i,n,a,o)=>{if(Je()){if(o.length>0)throw new Error("LoRA adapter is not supported for proxy.");if(r.some(u=>u[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(u=>u))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ut(),new Promise((u,l)=>{Mt("run",[u,l]);let p=r,f={type:"run",in:{sessionId:e,inputIndices:t,inputs:p,outputIndices:i,options:a}};qe.postMessage(f,Qn(p))})}else return Kn(e,t,r,i,n,a,o)},jc=async e=>{if(Je())return Ut(),new Promise((t,r)=>{Mt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};qe.postMessage(i)});Zn(e)}}),Jn,Kc=M(()=>{"use strict";Me(),Yn(),Jn=class{async loadAdapter(e){Le(),this.adapterId=await Gc(e),Ne()}async dispose(){return Hc(this.adapterId)}}}),ea,Zc,Qc,wg=M(()=>{"use strict";Me(),Kc(),Yn(),ee(),mi(),Ai(),ea=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Zc=e=>{switch(e[3]){case"cpu":return new Ve(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ei(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return Ve.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!Ci(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return Ve.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},Qc=class{async fetchModelAndCopyToWasmMemory(e){return qc(await Ir(e))}async loadModel(e,t){Le();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Wc(r,t),Ne()}async dispose(){return Vc(this.sessionId)}async run(e,t,r,i=[]){Le();let n=i.map(_=>{if(!(_ instanceof Jn))throw new Error("LoRA adapter was not created by the WebAssembly backend.");return _.adapterId}),a=[],o=[];Object.entries(e).forEach(_=>{let y=_[0],x=_[1],S=this.inputNames.indexOf(y);if(S===-1)throw new Error(`invalid input '${y}'`);a.push(x),o.push(S)});let u=[],l=[];Object.entries(t).forEach(_=>{let y=_[0],x=_[1],S=this.outputNames.indexOf(y);if(S===-1)throw new Error(`invalid output '${y}'`);u.push(x),l.push(S)});let p=a.map((_,y)=>ea(_,()=>`input "${this.inputNames[o[y]]}"`)),f=u.map((_,y)=>_?ea(_,()=>`output "${this.outputNames[l[y]]}"`):null),m=await Fc(this.sessionId,o,p,l,f,r,n),g={};for(let _=0;_<m.length;_++)g[this.outputNames[l[_]]]=u[_]??Zc(m[_]);return Ne(),g}startProfiling(){}endProfiling(){jc(this.sessionId)}}}),Xc,$g=M(()=>{"use strict";Xc=e=>{if(e?.epContextDataRead)throw new Error('session option "epContextDataRead" is not supported by ONNX Runtime Web')}}),Yc={};Vt(Yc,{OnnxruntimeWebAssemblyBackend:()=>ra,initializeFlags:()=>ta,wasmBackend:()=>Jc});var ta,ra,Jc,bg=M(()=>{"use strict";Me(),Kc(),Yn(),wg(),$g(),ta=()=>{(typeof we.wasm.initTimeout!="number"||we.wasm.initTimeout<0)&&(we.wasm.initTimeout=0);let e=we.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),we.wasm.simd=!1),typeof we.wasm.proxy!="boolean"&&(we.wasm.proxy=!1),typeof we.wasm.trace!="boolean"&&(we.wasm.trace=!1),typeof we.wasm.numThreads!="number"||!Number.isInteger(we.wasm.numThreads)||we.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)we.wasm.numThreads=1;else{let t=typeof navigator>"u"?im("node:os").cpus().length:navigator.hardwareConcurrency;we.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},ra=class{async init(e){ta(),await Pc(),await Lc(e)}async createInferenceSessionHandler(e,t){Xc(t);let r=new Qc;return await r.loadModel(e,t),r}async createLoraAdapterHandler(e){let t=new Jn;return await t.loadAdapter(e),t}},Jc=new ra});Me(),Me(),Me();var vg="1.31.1";{let e=(bg(),Yt(Yc)).wasmBackend;Ht("webgpu",e,5),Ht("webnn",e,5),Ht("cpu",e,10),Ht("wasm",e,10)}Object.defineProperty(we.versions,"web",{value:vg,enumerable:!0});/**
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
 */const xg="/pixcuro/u2netp.onnx",ef=320;let ia=null,Hr=null;async function tf(){return ia||Hr||(Hr=(async()=>{const e=await hi.create(xg,{executionProviders:["wasm"]});return ia=e,e})(),Hr)}self.onmessage=async e=>{const{type:t}=e.data;if(t==="INIT"){try{await tf(),self.postMessage({type:"READY"})}catch(r){self.postMessage({type:"ERROR",error:r?.message||String(r)})}return}if(t==="RUN"){try{const r=e.data.input,i=await tf(),n=i.inputNames,o={[n.length>0?n[0]:"input1"]:new Ve(r,[1,3,ef,ef])},u=await i.run(o),l=i.outputNames,p=l.length>0?l[0]:"0",m=u[p].data;self.postMessage({type:"RESULT",output:m},[m.buffer])}catch(r){self.postMessage({type:"ERROR",error:r?.message||String(r)})}return}}})();
