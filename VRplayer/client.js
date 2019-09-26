// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"
import {ReactInstance,Surface,Location} from 'react-360-web';


 
function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    cursorVisibility: 'visible',

    ...options,
  });
  const search = location.search;
  const params = new URLSearchParams(search);
  const type = params.get('type');
  switch(type){
    case "InteractiveVideo":
        r360.renderToSurface(
          r360.createRoot('InteractiveVideo',{ videoUrl: 'https://firebasestorage.googleapis.com/v0/b/govrlms.appspot.com/o/video180.mp4?alt=media&token=01939a50-bd31-4682-ac7c-7ee2a7d3d3b7',
            videoFormat: '3DLR',
            videoPath: 'video180.mp4' }
          ),
          r360.getDefaultSurface()
        );
        var s = r360.getDefaultSurface();
        s.setShape(Surface.SurfaceShape.Cylinder );
        s.resize(1000, 900);
      console.log("Interactive Video");
      break;
    case "InteractiveObject":
        const location = new Location([0, -20, -50]);
        const leftPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
        leftPanel.setAngle(-0.6, 0);
        const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
        rightPanel.setAngle(0.6, 0);
        r360.renderToSurface(
          r360.createRoot('SideMenu'),
          leftPanel,
        );
        r360.renderToSurface(
          r360.createRoot('DetailPanel'),
          rightPanel,
        );
        r360.renderToLocation(
          r360.createRoot('InteractiveObject'),
          new Location([0, 0, -10]),
        );
        
      console.log("Interactive Object");
      break;
    case "InteractiveImage":
       /* r360.renderToSurface(
          r360.createRoot('VRLMS', //{ / initial props / }
          ),
          r360.getDefaultSurface()
        );
        const s = r360.getDefaultSurface();
        s.setShape(Surface.SurfaceShape.Cylinder );
        s.resize(1000, 900);*/
      console.log("Interactive Image");
      break;
    default:
        r360.renderToSurface(
          r360.createRoot('VRLMS', //{ / initial props / }
          ),
          r360.getDefaultSurface()
        );
        var s = r360.getDefaultSurface();
        s.setShape(Surface.SurfaceShape.Cylinder );
        s.resize(1000, 900);
      break;
  }
  // Render your app content to the default cylinder surface
  
  r360.compositor.setCursorVisibility('visible');
  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}

window.React360 = {init};
