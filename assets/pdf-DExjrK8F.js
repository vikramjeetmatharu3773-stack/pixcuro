import{F as D}from"./archive-DLzUfKNp.js";const j=[255,216,255],b=[137,80,78,71];function E(o){return new Promise(r=>{const c=new FileReader;c.onloadend=()=>{const n=new Uint8Array(c.result);n.length>=4&&n[0]===b[0]&&n[1]===b[1]&&n[2]===b[2]&&n[3]===b[3]?r("png"):n.length>=3&&n[0]===j[0]&&n[1]===j[1]&&n[2]===j[2]?r("jpeg"):r("png")},c.onerror=()=>r("png"),c.readAsArrayBuffer(o.slice(0,4))})}async function G(o){return new Uint8Array(await o.arrayBuffer())}async function H(o,r){const{pageWidthPt:c,pageHeightPt:n}=r,x=[],m=`%PDF-1.4
%Äåòåë§ó ÐÄÆ
`;let a=3;const g=[],$=[],y=[];for(let t=0;t<o.length;t++)y.push(a++),$.push(a++);const u=a++;for(let t=0;t<o.length;t++)g.push(a++);const d=new TextEncoder;let i=d.encode(m);const l=(t,e)=>{const s=new Uint8Array(t.length+e.length);return s.set(t,0),s.set(e,t.length),s};function f(t,e){const s=typeof e=="string"?d.encode(e):e;x[t]=i.length;const p=d.encode(`${t} 0 obj
`),h=d.encode(`
endobj
`);i=l(i,l(p,l(s,h)))}f(1,`<< /Type /Catalog /Pages ${u} 0 R >>`);for(let t=0;t<o.length;t++){const e=o[t],s=await G(e.blob),R=`<< /Type /XObject /Subtype /Image /Width 0 /Height 0 /BitsPerComponent 8 /ColorSpace /DeviceRGB ${await E(e.blob)==="jpeg"?"/Filter /DCTDecode":"/Filter /FlateDecode"} /Length ${s.length} >>
stream
`,S=l(d.encode(R),l(s,d.encode(`
endstream`)));f(y[t],S);const O=e.x,T=n-e.y-e.heightPt,A=e.widthPt,C=e.heightPt,w=`q
${A} 0 0 ${C} ${O} ${T} cm
/Im${t} Do
Q
`;f($[t],`<< /Length ${w.length} >>
stream
${w}endstream`)}const I=g.map(t=>`${t} 0 R`).join(" ");f(u,`<< /Type /Pages /Count ${g.length} /Kids [${I}] >>`);for(let t=0;t<o.length;t++){const e=g[t],s=$[t],p=y[t],h=`<< /Type /Page /Parent ${u} 0 R /MediaBox [0 0 ${c} ${n}] /Resources << /XObject << /Im${t} ${p} 0 R >> >> /Contents ${s} 0 R >>`;f(e,h)}let P=`xref
0 ${a}
0000000000 65535 f 
`;for(let t=1;t<a;t++)P+=`${String(x[t]??0).padStart(10,"0")} 00000 n 
`;const B=d.encode(P),F=d.encode(`trailer
<< /Size ${a} /Root 1 0 R >>
startxref
${i.length}
%%EOF
`);return i=l(i,l(B,F)),new Blob([i],{type:"application/pdf"})}async function X(o,r,c){const n=await H(r,c);D.saveAs(n,o.endsWith(".pdf")?o:`${o}.pdf`)}export{X as d};
