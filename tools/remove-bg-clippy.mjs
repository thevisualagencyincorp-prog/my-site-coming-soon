import { PNG } from 'pngjs';
import fs from 'fs';

const p = 'public/images/clippy-1.png';
if (!fs.existsSync(p)) {
  console.error('file not found', p);
  process.exit(2);
}
const buf = fs.readFileSync(p);
const png = PNG.sync.read(buf);
const { width: w, height: h, data } = png;

const idx = (x,y)=> (y*w + x)*4;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

// sample four corners
const samplePatch=(sx,sy,sz=6)=>{
  let r=0,g=0,b=0,c=0;
  for(let y=sy;y<sy+sz;y++) for(let x=sx;x<sx+sz;x++){
    const p=idx(clamp(x,0,w-1), clamp(y,0,h-1)); r+=data[p]; g+=data[p+1]; b+=data[p+2]; c++;
  }
  return [r/c,g/c,b/c];
}
const samples=[samplePatch(0,0), samplePatch(w-6,0), samplePatch(0,h-6), samplePatch(w-6,h-6)];
const dist2=(a,b)=>{const dr=a[0]-b[0],dg=a[1]-b[1],db=a[2]-b[2]; return dr*dr+dg*dg+db*db}
const tol=900; // tolerance squared

const visited=new Uint8Array(w*h);
const q=[];
const pushIf=(x,y)=>{
  if(x<0||y<0||x>=w||y>=h) return; const id=y*w+x; if(visited[id]) return;
  const p=idx(x,y); const c=[data[p],data[p+1],data[p+2]];
  for(const s of samples) if(dist2(c,s)<=tol){ visited[id]=1; q.push(x,y); break; }
}
for(let x=0;x<w;x++){ pushIf(x,0); pushIf(x,h-1); }
for(let y=0;y<h;y++){ pushIf(0,y); pushIf(w-1,y); }
while(q.length){ const y=q.pop(), x=q.pop(); const p=idx(x,y); data[p+3]=0; pushIf(x+1,y); pushIf(x-1,y); pushIf(x,y+1); pushIf(x,y-1); }
const out=PNG.sync.write(png);
fs.writeFileSync(p, out);
console.log('wrote', p);
