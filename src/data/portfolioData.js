const BASE = import.meta.env.BASE_URL || '/';
const basePrefix = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;

export function withBase(path) {
  if (!path || typeof path !== 'string') return path;
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path;
  if (path.startsWith('/assets/')) return `${basePrefix}${path}`;
  return path;
}

export const personalInfo = {
  name: "Anitha Roselin S",
  title: "Interior Designer & 3D Visualization Specialist",
  tagline: "Designing Spaces, Creating Experiences",
  experienceYears: "4",
  location: "Al Ain, UAE",
  email: "anitharose2210@gmail.com",
  phone: "+971 56 933 4264",
  phoneFormatted: "+971 56 933 4264",
  profileImage: withBase("/assets/anitha-profile.jpg"),
  whatsappUrl: "https://wa.me/971569334264?text=Hello%20Anitha,%20I%20would%20like%20to%20discuss%20an%20interior%20design%20project.",
  about: `Interior Designer with 4 years of experience specializing in high-end residential interior design, spatial planning, and photorealistic 3D visualization. Proficient in translating architectural concepts into aesthetically striking, functional living environments through comprehensive 2D technical drawings, detailed elevations, and immersive CGI renderings. Dedicated to elevating residential lifestyle spaces through tactile material palettes, thoughtful lighting, and seamless client coordination from concept to delivery.`,
  heroIntro: "Transforming residential visions into refined, bespoke sanctuaries. With 4 years of expertise spanning Chennai and the UAE, I craft harmonious spaces balanced between aesthetic luxury and purposeful functionality."
};

export const stats = [
  { value: "4+", label: "Years of Experience" },
  { value: "40+", label: "Residential Concepts" },
  { value: "100+", label: "3D Visualizations & Plans" },
  { value: "100%", label: "Precision & Client Focus" }
];

export const aboutHighlights = [
  {
    title: "Space Planning & Ergonomics",
    description: "Maximizing spatial flow, natural light orientation, and circulation comfort tailored to contemporary living."
  },
  {
    title: "Furniture Layout & Design",
    description: "Curating bespoke furniture schemes, custom millwork, and ergonomic arrangements that balance scale and intimacy."
  },
  {
    title: "2D Drawings & Elevations",
    description: "Producing construction-ready CAD plans, electrical demarcations, wall sections, and architectural elevations."
  },
  {
    title: "3D Modelling & Photorealistic Rendering",
    description: "Developing hyper-detailed 3D environments with accurate materials, photometric lighting, and textures."
  },
  {
    title: "Material & Finish Selection",
    description: "Specifying luxury veneers, natural stones, laminates, fabrics, and metallic accents with tactile synergy."
  },
  {
    title: "Client Coordination & Revisions",
    description: "Active collaboration throughout design iterations, translating aspirations into buildable, cost-conscious solutions."
  }
];

export const services = [
  {
    id: "residential-design",
    title: "Residential Interior Design",
    description: "Comprehensive end-to-end design concepts for luxury villas, apartments, and penthouses blending luxury aesthetics with everyday warmth.",
    deliverables: ["Concept Mood Boards", "Spatial Zoning", "Material Schemes", "Turnkey Design Direction"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "space-planning",
    title: "Space Planning",
    description: "Strategic layout optimization ensuring intuitive circulation, functional efficiency, and harmonious visual proportions across open or compact areas.",
    deliverables: ["Circulation Studies", "Zoning Diagrams", "Scale Drawings", "Spatial Efficiency Optimization"],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "furniture-layout",
    title: "Furniture Layout",
    description: "Meticulous furniture planning balancing focal points, walking clearances, scale proportions, and custom joinery placements.",
    deliverables: ["Dimensioned Furniture Plans", "Clearance Diagrams", "Bespoke Millwork Positions", "Custom Sizing Specs"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "floor-plans-2d",
    title: "2D Floor Plans",
    description: "Rigorous technical drafting detailing wall partitions, door swings, structural demarcations, and precise dimensioning ready for site execution.",
    deliverables: ["AutoCAD Scaled Plans", "Civil Modification Demarcation", "Partition Layouts", "Dimensioned Setting-Out"],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "elevation-drawings",
    title: "Elevation Drawings",
    description: "Detailed vertical architectural views showing wall finishes, cabinetry profiles, TV units, cladding, and exact lighting fixture heights.",
    deliverables: ["Wall Feature Sections", "Cabinetry Elevations", "Electrical & Fixture Heights", "Finish Material Callouts"],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "3d-visualization",
    title: "3D Interior Visualization",
    description: "CGI rendering that simulates natural sun paths, artificial warm illumination, realistic textures, and spatial depth before construction begins.",
    deliverables: ["High-Res Renders", "Day & Night Lighting Views", "3ds Max & V-Ray Visualization", "Virtual Walkthrough Assets"],
    image: "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "material-selection",
    title: "Material & Laminate Selection",
    description: "Hand-picked specifications of premium laminates, fluted panels, quartz countertops, Italian marbles, upholstery fabrics, and metallic trims.",
    deliverables: ["Tactile Mood Boards", "Vendor & Code Specifications", "Finish Schedules", "Durability Assessment"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "interior-detailing",
    title: "Interior Detailing",
    description: "Deep dive technical joinery details, false ceiling cove profiles, shadow gaps, niche recesses, and bespoke artisan wood details.",
    deliverables: ["False Ceiling & Cove Details", "Custom Joinery Sections", "Hardware Specifications", "Fabrication-Ready Shop Drawings"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
  }
];

export const portfolioCategories = [];

export const roomProjects = {
  Kitchen: {
    id: 1,
    roomKey: "Kitchen",
    title: "Project 1: Multi-Space Residence – L-Shaped Kitchen, Bedroom TV Suite & Living Architecture (3D & 2D CAD)",
    categories: [
      "Kitchen",
      "Bedroom",
      "Living Room",
      "Modular Kitchen",
      "Crockery Unit",
      "Living Vanity",
      "Master Bedroom TV Unit",
      "3D Visualization",
      "2D Floor Plans",
      "Residential Interior Design"
    ],
    categoryLabel: "Multi-Category Project · Kitchen · Bedroom · Living Suite",
    image: "/assets/kitchen-3d-render-1.jpg",
    isTechnicalCAD: true,
    has3DRenders: true,
    tabNames: ["Kitchen", "Crockery Unit", "Living Vanity", "Master Bedroom TV Unit"],
    galleryImages: [
      {
        id: "3d-1",
        type: "3D CGI Render",
        room: "Kitchen",
        category: "Kitchen",
        shortLabel: "3D View 1",
        badge: "3D 1",
        title: "3D Photorealistic Render – Frontal Perspective",
        src: "/assets/kitchen-3d-render-1.jpg",
        desc: "Photorealistic 3D visualization showing high-gloss Champagne base cabinets, frosted white upper cabinets, fluted glass spice rack units with warm under-cabinet LED cove illumination, and black granite countertop."
      },
      {
        id: "3d-2",
        type: "3D CGI Render",
        room: "Kitchen",
        category: "Kitchen",
        shortLabel: "3D View 2",
        badge: "3D 2",
        title: "3D Photorealistic Render – Wide Angle Dining Perspective",
        src: "/assets/kitchen-3d-render-2.jpg",
        desc: "Wide perspective showing spatial circulation, open-plan dining transition, 3-tier tandem drawer unit, built-in cooktop, and seamless ceiling loft shuttering."
      },
      {
        id: "3d-3",
        type: "3D CGI Render",
        room: "Kitchen",
        category: "Crockery Unit",
        shortLabel: "3D Crockery 3",
        badge: "3D 3",
        title: "3D Photorealistic Render – Crockery Unit & Dining Transition",
        src: "/assets/crockery-3d-render.jpg",
        desc: "Photorealistic 3D visualization showing the bespoke royal blue PU finish crockery unit with antique button handles, 3 base drawers, 18mm Nice Wood countertop, overhead glass display cabinet, and adjacent refrigerator."
      },
      {
        id: "2d-1",
        type: "2D Working Plan",
        room: "Kitchen",
        category: "Kitchen",
        shortLabel: "2D Plan 1",
        badge: "2D 1",
        title: "CAD Sheet 1: 2D Working Floor Plan & Production Details",
        src: "/assets/kitchen-2d-plan-page1.png",
        pdfFile: "/assets/docs/kitchen-page-1.pdf",
        desc: "Millimeter-accurate 2D layout (2285mm × 2675mm), floor unit layout, sink & hob positioning, wall unit demarcation, and master production schedule."
      },
      {
        id: "2d-2",
        type: "2D Isometric CAD",
        room: "Kitchen",
        category: "Kitchen",
        shortLabel: "2D Iso 2",
        badge: "2D 2",
        title: "CAD Sheet 2: 3D Isometric Wireframe & Corner Assembly",
        src: "/assets/kitchen-2d-iso-page2.png",
        pdfFile: "/assets/docs/kitchen-page-2.pdf",
        desc: "Axonometric 3D wireframe layout illustrating carcass joinery, FBCM-RT corner unit (1130mm × 980mm), appliance clearances, and work triangle flow."
      },
      {
        id: "2d-3",
        type: "2D Loft Plan",
        room: "Kitchen",
        category: "Kitchen",
        shortLabel: "2D Loft 3",
        badge: "2D 3",
        title: "CAD Sheet 3: Loft Only Shuttering & Framework Elevation",
        src: "/assets/kitchen-2d-loft-page3.png",
        pdfFile: "/assets/docs/kitchen-page-3.pdf",
        desc: "Upper ceiling loft shuttering plan (1685mm × 2100mm) with 540mm shutter height, top 70mm batten, soffit bottom panels, and finger groove detail."
      },
      {
        id: "2d-4",
        type: "2D Crockery CAD",
        room: "Kitchen",
        category: "Crockery Unit",
        shortLabel: "2D Crockery 4",
        badge: "2D 4",
        title: "CAD Sheet 4: Crockery Unit External & Internal Elevation Plan",
        src: "/assets/kitchen-crockery-page4.png",
        pdfFile: "/assets/docs/kitchen-crockery-page-4.pdf",
        desc: "Detailed 2D elevations (900mm W × 450mm D × 2110mm H) showing 3 base drawers, 18mm 10197 Nice Wood countertop, plain glass wall shutters with 2 internal glass shelves, and spotlight/vertical strip lighting provisions."
      },
      {
        id: "2d-5",
        type: "2D Vanity CAD",
        room: "Living Room",
        category: "Living Vanity",
        shortLabel: "2D Vanity 5",
        badge: "2D 5",
        title: "CAD Sheet 5: Living Vanity External & Internal Elevation Plan",
        src: "/assets/living-vanity-page5.png",
        desc: "Architectural 2D elevation drawing (Page 5) detailing 745mm wide × 350mm deep base vanity unit, 21054 SF Light Beige shutters (345mm each), PU side panels & skirting matching crockery blue, internal adjustable shelf, client-scope granite top, and 600mm × 1000mm wall mirror panel."
      },
      {
        id: "3d-4",
        type: "3D CGI Render",
        room: "Living Room",
        category: "Living Vanity",
        shortLabel: "3D Vanity 4",
        badge: "3D 4",
        title: "3D Photorealistic Render – Living Vanity & Dining Niche",
        src: "/assets/living-vanity-3d-render.jpg",
        desc: "Photorealistic 3D visualization illustrating the dual-tone living vanity unit with royal blue PU side panels matching the crockery unit, light beige doors with Hadid SQ M black handles, granite countertop, and 1000mm high wall mirror beside the dark timber door and dining set."
      },
      {
        id: "2d-6",
        type: "2D TV Unit CAD",
        room: "Bedroom",
        category: "Master Bedroom TV Unit",
        shortLabel: "2D TV Unit 6",
        badge: "2D 6",
        title: "CAD Sheet 6: Master Bedroom TV Unit External & Internal Elevation Plan",
        src: "/assets/master-bedroom-tv-page6.jpg",
        desc: "Architectural 2D elevation drawing (Page 6) detailing 1335mm wide floating curved TV console (300mm H × 350mm D, 200mm FFL gap), 14016 VNR Malmok Natal Walnut finish, 46247 WVN Natural Reed 2-drawer front panels (525mm each), 14016 top open box (1335×300mm), 75mm/36mm layered backlit feature wall panels with PS cutouts, and LED strip light provisions."
      },
      {
        id: "3d-5",
        type: "3D CGI Render",
        room: "Bedroom",
        category: "Master Bedroom TV Unit",
        shortLabel: "3D TV Unit 5",
        badge: "3D 5",
        title: "3D Photorealistic Render – Master Bedroom TV Unit & Wardrobe Suite",
        src: "/assets/master-bedroom-tv-3d-render.jpg",
        desc: "Photorealistic 3D visualization illustrating the bespoke Master Bedroom TV unit in 14016 Malmok Natal Walnut and textured Natural Reed panels with warm LED halo backlighting, mounted TV, floating curved credenza, top open display shelf, and adjacent bay window seating & wardrobe."
      }
    ],
    pdfSheets: [
      {
        page: 1,
        title: "Page 1: 2D Working Plan & Production Details",
        file: "/assets/docs/kitchen-page-1.pdf",
        image: "/assets/kitchen-2d-plan-page1.png",
        desc: "Complete 2D floor plan layout (2285mm × 2675mm), base & wall unit codes, sink/hob positioning, and master production specifications."
      },
      {
        page: 2,
        title: "Page 2: 3D Isometric Wireframe & Corner Assembly",
        file: "/assets/docs/kitchen-page-2.pdf",
        image: "/assets/kitchen-2d-iso-page2.png",
        desc: "Axonometric 3D CAD view showing carcass assembly, FBCM-RT corner unit (1130mm × 980mm), overhead glass units, and work triangle."
      },
      {
        page: 3,
        title: "Page 3: Loft Only Shuttering & Framework Plan",
        file: "/assets/docs/kitchen-page-3.pdf",
        image: "/assets/kitchen-2d-loft-page3.png",
        desc: "Loft framework plan (1685mm × 2100mm), 540mm shutter height, bottom soffit panels, and finger groove detail."
      },
      {
        page: 4,
        title: "Page 4: Crockery Unit External & Internal Elevation Plan",
        file: "/assets/docs/kitchen-crockery-page-4.pdf",
        image: "/assets/kitchen-crockery-page4.png",
        desc: "Full 2D elevation drawing detailing 3 base drawers, 18mm 10197 Nice Wood countertop, glass wall unit with 2 glass shelves, and dual lighting scopes."
      },
      {
        page: 5,
        title: "Page 5: Living Vanity External & Internal Elevation Plan",
        image: "/assets/living-vanity-page5.png",
        desc: "Full 2D elevation drawing (Page 5) showing External & Internal views, 745mm base vanity, adjustable shelf, 21054 SF Light Beige shutters, PU side panels & skirting in crockery blue, and 600mm × 1000mm mirror."
      },
      {
        page: 6,
        title: "Page 6: Master Bedroom TV Unit External & Internal Elevation Plan",
        image: "/assets/master-bedroom-tv-page6.jpg",
        desc: "Full 2D elevation drawing (Page 6) detailing 1335mm floating TV console, 14016 Malmok Natal Walnut, 46247 Natural Reed drawer panels, top open box, and layered backlit wall panels."
      }
    ],
    description: "Complete turnkey design and technical execution for a modern L-shaped residential modular kitchen (2285mm × 2675mm) executed at Cookscape, Chennai. Perfectly bridges 3D photorealistic CGI visualization with fabrication-ready 2D AutoCAD working drawings, millimeter-accurate carcass dimensioning, Merino laminate scheduling, and EBCO soft-close hardware.",
    scope: "Photorealistic 3D visualization, 2D floor planning, elevation & working drawings, carcass dimensioning, Merino laminate scheduling, EBCO soft-close hardware specification, and lighting groove detailing.",
    software: ["3ds Max", "AutoCAD 2D", "V-Ray", "Photorealistic CGI", "Joinery CAD"],
    palette: [
      "21187 HGL Champagne (Merino)",
      "21091 HGL Frosty White (Merino)",
      "37301 LV Montery Elm (Merino)",
      "10197 Nice Wood (Merino)",
      "Black G-Profile Anodized",
      "Jet Black Granite"
    ],
    technicalUnitsList: {
      dimensions: {
        overall: "2285mm × 2675mm (L-Shape Configuration)",
        windowWall: "Left Wall: 55BS + 465mm + 915mm (Window) + 267mm + 815mm (Door) + 440mm",
        sinkRun: "Top Wall Run: 2285mm (Countertop Depth 550mm)",
        cookingRun: "Right Wall Run: 2675mm (Countertop Depth 550mm)",
        loftHeight: "540mm Shutter Height + 70mm Top Batten/BS",
        crockeryUnit: "Dining Crockery Unit: 900mm W × 450mm D × 2110mm H (Adjacent 1610mm Key Plan with Fridge)",
        livingVanity: "Living Vanity: 745mm W × 350mm D (+ 55mm BS) × 800mm H Base + 600mm × 1000mm Wall Mirror",
        bedroomTV: "Master Bedroom TV Unit: 1335mm W × 350mm D × 300mm H (200mm FFL Clearance) • Wall Feature 1335mm W × 1577mm H"
      },
      floorUnits: [
        { code: "FM 450", type: "Base Single Shutter", width: "450 mm", depth: "550 mm", desc: "Storage base cabinet with adjustable internal shelf and G-profile handle." },
        { code: "SINK 670", type: "Sink Base Cabinet (O/S 650)", width: "670 mm", depth: "550 mm", desc: "Plumbing sink unit with skirting attached to shutter & CNC cutout for ventilation." },
        { code: "FBCM-RT", type: "L-Corner Base Carcass", width: "1130 × 980 mm", depth: "550 mm", desc: "L-shaped blind corner unit with 580mm & 412mm carcass returns for magic corner accessories." },
        { code: "FM 285", type: "Oil Pull-Out (Tandem)", width: "285 mm", depth: "550 mm", desc: "Tandem bottle & condiment wire rack with soft-close bottom runners." },
        { code: "GAS 750 O/S", type: "Hob Base Unit (2 Cylinders)", width: "750 mm", depth: "550 mm", desc: "Houses 2 gas cylinders; skirting attached to shutter with CNC cutout for airflow safety." },
        { code: "FMd3-60", type: "3-Tier Drawer Stack", width: "600 mm", depth: "550 mm", desc: "1. Top PVC cutlery tray in wooden drawer (H-165mm); 2. Wooden drawer (H-165mm); 3. Deep tandem pot drawer (H-350mm)." },
        { code: "CRK-BASE-900", type: "Crockery 3-Drawer Base", width: "900 mm", depth: "450 mm", desc: "Base unit with 100mm legs, 718mm carcass, 3 drawers (200mm, 200mm, 300mm), 18mm 10197 Nice Wood countertop, and MH-452 Antique handles." },
        { code: "VANITY-745", type: "Living Vanity 2-Door Base", width: "745 mm", depth: "350 + 55BS mm", desc: "Two 345mm shutters in 21054 SF Light Beige CC Elite, PU side panels & skirting in Crockery blue, Hadid SQ M Black handles, adjustable shelf." },
        { code: "TV-BASE-1335", type: "Master Bedroom Floating TV Base", width: "1335 mm", depth: "350 mm", desc: "Dual 525mm drawers in 46247 Natural Reed with soft-close EBCO runners, 14016 Malmok Natal Walnut countertop & 143mm curved side returns." },
        { code: "SF Side Panel", type: "Finishing Side Panel", width: "620 × 820 mm", depth: "18 mm", desc: "External carcass side panel in 21187 HGL Champagne laminate." },
        { code: "BH Panel", type: "Backsplash Bottom Panel", width: "690 × 450 mm", depth: "18 mm", desc: "Backing and clearance panel for corner/hob wall transition." }
      ],
      wallUnits: [
        { code: "WM 430", type: "Wall Overhead Unit", width: "430 mm", depth: "300 mm", height: "660 mm", desc: "Single shutter overhead storage unit with extended shutter bottom finger pull." },
        { code: "WM 600", type: "Wall Overhead Unit", width: "600 mm", depth: "300 mm", height: "660 mm", desc: "Double shutter cabinet above sink counter with concealed strip light groove." },
        { code: "WM 600", type: "Wall Overhead Unit", width: "600 mm", depth: "300 mm", height: "660 mm", desc: "Secondary double shutter overhead cabinet in 21091 HGL Frosty White." },
        { code: "WBCM OPEN", type: "Corner Open Box Unit", width: "Corner Return", depth: "300 mm", height: "660 mm", desc: "Decorative accent open niche finished in 37301 LV Montery Elm (Merino)." },
        { code: "WM 700 - gl (SR 700)", type: "Glass Shutter + Spice Rack", width: "700 mm", depth: "300 mm", height: "660 mm", desc: "Fluted/clear glass shutter with internal spice rack & vertical groove for strip light." },
        { code: "CRK-WM-900", type: "Crockery Overhead Glass Unit", width: "900 mm", depth: "300 mm", height: "750 mm", desc: "Dual 450mm plain glass shutters, 2 internal glass shelves (3 × 226mm bays), under-cabinet spotlight provision, and dual vertical strip light grooves." },
        { code: "VANITY-MIRROR", type: "Living Vanity Mirror Panel", width: "600 mm", depth: "Panel", height: "1000 mm", desc: "SF Panel with mirror finished in 21054 SF Light Beige border." },
        { code: "TV-OPN-1335", type: "TV Overhead Open Box", width: "1335 mm", depth: "300 mm", height: "300 mm", desc: "Top open display cubby shelf in 14016 VNR RH Malmok Natal Walnut with PS point cutout." },
        { code: "TV-PNL-WALL", type: "TV Backlit Feature Paneling", width: "1335 mm", depth: "36mm & 75mm", height: "1277 mm", desc: "Layered panels in 46247 Natural Reed with recessed warm LED halo lighting channels & PS cutouts." },
        { code: "CHIMNEY 2'", type: "Extractor Hood Allowance", width: "600 mm (2')", depth: "Wall-mounted", height: "Open", desc: "Direct vent chimney provision centered over the 750mm hob unit." }
      ],
      loftUnits: [
        { code: "LOFT RUN A", type: "Sink Wall Loft", width: "1685 mm total", height: "540 + 70mm BS", desc: "Configured as 65mm BS + 520mm + 520mm + 520mm + 60mm BS shutters; SF Bottom Panel 1710mm × 550mm." },
        { code: "LOFT RUN B", type: "Cooking Wall Loft", width: "2100 mm total", height: "540 + 70mm BS", desc: "Configured as 70mm BS + 490mm + 490mm + 490mm + 490mm + 70mm BS shutters; SF Bottom Panel 2100mm × 550mm." }
      ],
      productionDetails: [
        { item: "Floor Carcass Dimensions", spec: "Height: 675 + 100mm (775mm) • Depth: 550mm • Shutter Height: 705mm" },
        { item: "Wall Carcass Dimensions", spec: "Height: 660mm • Depth: 300mm • Shutter Height: 660mm" },
        { item: "Crockery Unit Dimensions", spec: "Base: 900 × 450 × 818mm (100mm leg) • Splashback: 542mm H • Wall: 900 × 300 × 750mm H" },
        { item: "Carcass Core Material", spec: "BWP (Boiling Water Proof) Marine Grade Plywood in Half White" },
        { item: "Floor Shutter Laminate", spec: "21187 HGL Champagne (Merino) • Shutter Type: CC Glossy & PU" },
        { item: "Wall Shutter Laminate", spec: "21091 HGL Frosty White (Merino) • Shutter Type: CC Glossy" },
        { item: "Crockery Open Ledges & Top", spec: "10197 Nice Wood (Merino) 18mm Countertop & SF Back Panels (900×542mm)" },
        { item: "Crockery Handle Type", spec: "MH-452 Antique Handle (KHIM)" },
        { item: "Floor Unit Handles", spec: "G-Profile Handle with Black Anodized Caps" },
        { item: "Wall Unit Handles", spec: "Extended Shutter (Concealed bottom edge finger pull)" },
        { item: "Loft Handles", spec: "Finger Groove Handle with CC Elite shutters" },
        { item: "Hinges & Hardware", spec: "EBCO 1 Normal Closing & 1 Soft Closing System" },
        { item: "Drawer Runners", spec: "EBCO Soft Closing Tandem Runners" },
        { item: "Electrical & Lighting", spec: "Groove for strip light below WM, spot light provision below crockery WM, & internal vertical strip lights in glass units (Light-Wall2Wall Scope)" }
      ]
    }
  },

  Crockery: {
    id: 10,
    roomKey: "Crockery",
    title: "Project 1 Crockery Unit: 3D Visualization & 2D Architecture Working Drawings",
    categories: ["Crockery Unit", "Kitchen", "Modular Kitchen", "3D Visualization", "2D Floor Plans", "Residential Interior Design"],
    categoryLabel: "Crockery Unit · 3D Render & 2D CAD",
    image: "/assets/crockery-3d-render.jpg",
    isTechnicalCAD: true,
    has3DRenders: true,
    tabNames: ["Crockery Unit", "Kitchen"],
    galleryImages: [
      {
        id: "crk-3d-1",
        type: "3D CGI Render",
        shortLabel: "3D Render",
        badge: "3D 1",
        title: "3D Photorealistic Render – Crockery Unit & Dining Transition",
        src: "/assets/crockery-3d-render.jpg",
        desc: "Photorealistic 3D visualization showing the bespoke royal blue PU finish crockery unit with antique button handles, 3-tier base drawers, 18mm Nice Wood countertop with microwave, illuminated glass display cabinet, and adjacent refrigerator."
      },
      {
        id: "crk-2d-1",
        type: "2D Working CAD",
        shortLabel: "CAD Sheet 4",
        badge: "2D 4",
        title: "CAD Sheet 4: Crockery Unit External & Internal Elevation Plan",
        src: "/assets/kitchen-crockery-page4.png",
        pdfFile: "/assets/docs/kitchen-crockery-page-4.pdf",
        desc: "Full working drawing (Page 4) detailing 900mm wide External & Internal views, 3-tier drawer stack, 18mm 10197 Nice Wood countertop, glass wall unit with dual glass shelves, wire manager, spotlight, and vertical LED strip light provisions."
      }
    ],
    pdfSheets: [
      {
        page: 4,
        title: "Page 4: Crockery Unit External & Internal Elevation Plan",
        file: "/assets/docs/kitchen-crockery-page-4.pdf",
        image: "/assets/kitchen-crockery-page4.png",
        desc: "Detailed 2D elevations (900mm W × 450mm D × 2110mm H) showing 3 base drawers, 18mm 10197 Nice Wood countertop, glass wall unit with 2 glass shelves, and dual lighting scopes."
      }
    ],
    description: "Architectural 2D working drawing and production specifications for a bespoke dining-kitchen transition Crockery Unit (900mm W × 450mm D × 2110mm H) designed and detailed at Cookscape, Chennai. Features External & Internal elevation views, 3-tier utility drawers with MH-452 antique handles, 18mm 10197 Nice Wood countertop, plain glass wall cabinet with dual glass shelves, wire manager port, and integrated dual lighting provisions.",
    scope: "2D joinery drafting in AutoCAD, millimeter-accurate carcass dimensioning, internal glass shelf spacing, Merino 10197 Nice Wood specification, EBCO soft-close hardware, and spotlight/vertical strip light detailing.",
    software: ["AutoCAD 2D", "Joinery Detailing", "Working Drawings", "Production Planning"],
    palette: [
      "10197 Nice Wood (Merino)",
      "Half White BWP Carcass",
      "PU Shutter Finish",
      "MH-452 Antique Handles (KHIM)",
      "Toughened Plain Glass"
    ],
    technicalUnitsList: {
      dimensions: {
        overall: "Crockery Unit: 900mm W × 450mm D × 2110mm H • Key Plan Span: 1610mm W × 450mm D (Crockery 900mm + Refrigerator Space)",
        baseUnit: "Base Carcass: 900mm W × 450mm D × 718mm H + 100mm Concealed Legs (Total Height 818mm)",
        splashback: "Middle Niche / Splashback: 900mm W × 542mm H (SF Back Panel in 10197 Nice Wood)",
        wallUnit: "Overhead Glass Cabinet: 900mm W × 300mm D × 750mm H (Internal 3 equal 226mm bays)"
      },
      floorUnits: [
        { code: "CRK-DRW-01", type: "Top Utility Drawer", width: "900 mm", depth: "450 mm", desc: "200mm external shutter height (internal carcass height 164mm); MH-452 Antique handle with soft-closing EBCO runners." },
        { code: "CRK-DRW-02", type: "Middle Storage Drawer", width: "900 mm", depth: "450 mm", desc: "200mm external shutter height (internal carcass height 164mm); MH-452 Antique handle with soft-closing EBCO runners." },
        { code: "CRK-DRW-03", type: "Bottom Deep Drawer", width: "900 mm", depth: "450 mm", desc: "300mm external shutter height (internal carcass height 264mm) for heavy tableware and dinner sets." },
        { code: "CRK-TOP-01", type: "18mm Countertop Slab", width: "900 × 450 mm", depth: "450 mm", desc: "18mm thick countertop finished in Merino 10197 Nice Wood." },
        { code: "CRK-LEG-01", type: "Adjustable Base Legs", width: "4 Legs", depth: "100 mm H", desc: "100mm heavy-duty leveling legs with skirting finished as per meters." }
      ],
      wallUnits: [
        { code: "CRK-SHT-01", type: "Left Glass Shutter", width: "450 mm", depth: "300 mm", height: "750 mm", desc: "Plain glass shutter framed in PU finish with antique pull handle." },
        { code: "CRK-SHT-02", type: "Right Glass Shutter", width: "450 mm", depth: "300 mm", height: "750 mm", desc: "Matching plain glass shutter framed in PU finish with antique pull handle." },
        { code: "CRK-GLS-01", type: "Toughened Glass Shelves", width: "900 × 300 mm", depth: "2 Shelves", height: "3 × 226 mm bays", desc: "2 adjustable tempered glass shelves creating three display tiers of 226mm clearance each." }
      ],
      loftUnits: [
        { code: "CRK-PNL-01", type: "SF Back Panel", width: "900 × 542 mm", height: "542 mm", desc: "Special finish back panel in 10197 Nice Wood with wire manager grommet cutout." },
        { code: "CRK-PNL-02", type: "Both Sides SF Panels", width: "320 × 542 mm", height: "542 mm", desc: "Dual return side panels in 10197 Nice Wood enclosing the middle countertop niche." }
      ],
      productionDetails: [
        { item: "Carcass Core Material", spec: "BWP (Boiling Water Proof) Marine Grade Plywood in Half White" },
        { item: "Shutter Type & Finish", spec: "PU (Polyurethane) Finish with Plain Glass Inserts on Wall Units" },
        { item: "Open Box & Countertop", spec: "10197 Nice Wood (Merino) on Countertop & Niche Wall Panels" },
        { item: "Hardware Handles", spec: "MH-452 Antique Finish Handles (KHIM)" },
        { item: "Hinges", spec: "One Normal and One Soft Closing & EBCO" },
        { item: "Drawer Runners", spec: "Full Extension Soft Closing & EBCO" },
        { item: "Spot Light Scope", spec: "Need spot light provision recessed under overhead glass cabinet (Light-Wall2Wall Scope)" },
        { item: "Internal Vertical Light", spec: "In WM, internal need vertical strip light provision on both sides (Light-Wall2Wall Scope)" },
        { item: "Wire Management", spec: "Need wire manager grommet in back panel (Our Scope)" }
      ]
    }
  },

  "Living Vanity": {
    id: 11,
    roomKey: "Living Vanity",
    title: "Project 1 Living Vanity: 2D Architecture & 3D Visualization",
    categories: ["Living Vanity", "Kitchen", "Living Room", "2D Floor Plans", "3D Visualization", "Residential Interior Design"],
    categoryLabel: "Living Vanity · 2D CAD & 3D Render",
    image: "/assets/living-vanity-3d-render.jpg",
    isTechnicalCAD: true,
    has3DRenders: true,
    tabNames: ["Living Vanity", "Kitchen", "Crockery Unit"],
    galleryImages: [
      {
        id: "vanity-2d-1",
        type: "2D Working CAD",
        shortLabel: "CAD Sheet 5",
        badge: "2D 5",
        title: "CAD Sheet 5: Living Vanity External & Internal Elevation Plan",
        src: "/assets/living-vanity-page5.png",
        desc: "Architectural 2D elevation drawing (Page 5) detailing 745mm wide × 350mm deep (+55mm BS) base unit, 21054 SF Light Beige shutters (345mm each), PU side panels & skirting matching crockery unit blue, internal adjustable shelf, client-scope granite top, and 600mm × 1000mm wall mirror panel."
      },
      {
        id: "vanity-3d-1",
        type: "3D CGI Render",
        shortLabel: "3D Render",
        badge: "3D 1",
        title: "3D Photorealistic Render – Living Vanity & Dining Niche",
        src: "/assets/living-vanity-3d-render.jpg",
        desc: "Photorealistic 3D visualization illustrating the bespoke dual-tone living vanity with royal blue PU side panels matching the crockery unit, light beige doors with Hadid SQ M black handles, granite countertop, and 1000mm high wall mirror beside the dark timber door and dining set."
      }
    ],
    pdfSheets: [
      {
        page: 5,
        title: "Page 5: Living Vanity External & Internal Elevation Plan",
        image: "/assets/living-vanity-page5.png",
        desc: "Full working drawing (Page 5) showing External & Internal elevation views, 745mm base vanity, adjustable shelf, 21054 SF Light Beige shutters, PU side panels & skirting in crockery blue, and 600mm × 1000mm mirror."
      }
    ],
    description: "Architectural 2D working drawings and photorealistic 3D visualization for a bespoke Living Vanity unit (745mm W × 350mm D × 800mm H base + 600mm × 1000mm mirror panel) designed at Cookscape, Chennai. Perfectly harmonized with the adjacent royal blue crockery unit through matching PU side panels and skirting, paired with elegant 21054 SF Light Beige doors, 6-inch Hadid SQ M Black handles, adjustable storage shelf, and client-scope granite countertop.",
    scope: "2D CAD drafting, internal shelf sectioning, BWP carcass engineering, Merino laminate matching, PU coating specification, and 3D CGI photorealistic rendering.",
    software: ["AutoCAD 2D", "3ds Max", "V-Ray", "Joinery CAD"],
    palette: [
      "21054 SF Light Beige (Merino)",
      "Royal Blue PU (Matches Crockery Unit)",
      "Hadid SQ M Black (6-inch) Handles",
      "Granite Top (Client Scope)",
      "Half White BWP Carcass"
    ],
    technicalUnitsList: {
      dimensions: {
        overall: "Living Vanity: 745mm W × 350mm D (+ 55mm BS) × 800mm H Base • Mirror: 600mm W × 1000mm H",
        baseUnit: "Base Carcass: 690mm Carcass Width + Side Panels (Total 745mm), 700mm Shutter Height + 100mm Legs",
        shutters: "Two Shutters: 345mm + 345mm in 21054 SF Light Beige CC Elite",
        mirrorPanel: "Wall Mirror: 600mm W × 1000mm H SF Panel with Mirror in 21054"
      },
      floorUnits: [
        { code: "VANITY-BASE", type: "Living Vanity 2-Door Base", width: "745 mm", depth: "350 + 55BS mm", desc: "Two 345mm shutters in 21054 SF Light Beige; 700mm shutter height, 100mm legs; PU side panels & skirting matching crockery blue." },
        { code: "VANITY-SHF", type: "Internal Adjustable Shelf", width: "690 mm", depth: "323 × 323 mm", desc: "Heavy-duty adjustable shelf dividing carcass into two 323mm high storage bays." },
        { code: "GRANITE-TOP", type: "Granite Countertop", width: "745 × 350 mm", depth: "Client Scope", desc: "Premium polished granite top provision executed under client scope." }
      ],
      wallUnits: [
        { code: "SF-MIRROR", type: "SF Panel with Mirror", width: "600 mm", depth: "18 mm", height: "1000 mm", desc: "Wall-mounted mirror panel finished in 21054 laminate border." }
      ],
      loftUnits: [],
      productionDetails: [
        { item: "Carcass Core Material", spec: "BWP (Boiling Water Proof) Marine Grade Plywood in Half White" },
        { item: "Shutter Type & Finish", spec: "CC Elite with 21054 SF Light Beige laminate & matching edge banding" },
        { item: "Side Panels & Skirting", spec: "PU Finish matching Crockery Unit blue color exactly (as per attached reference)" },
        { item: "Handle Type", spec: "Hadid SQ M Black (6-inch) vertical handles" },
        { item: "Hinges & Hardware", spec: "One Normal Closing and One Soft Closing & EBCO" },
        { item: "Countertop Specification", spec: "Granite Top (Client Scope)" }
      ]
    }
  },

  "Master Bedroom TV Unit": {
    id: 12,
    roomKey: "Master Bedroom TV Unit",
    title: "Project 1 Master Bedroom TV Unit: 2D Architecture & 3D Visualization",
    categories: ["Master Bedroom TV Unit", "Bedroom", "2D Floor Plans", "3D Visualization", "Residential Interior Design"],
    categoryLabel: "Master Bedroom TV Unit · 2D CAD & 3D Render",
    image: "/assets/master-bedroom-tv-3d-render.jpg",
    isTechnicalCAD: true,
    has3DRenders: true,
    tabNames: ["Master Bedroom TV Unit", "Master Bedroom"],
    galleryImages: [
      {
        id: "tv-2d-1",
        type: "2D Working CAD",
        shortLabel: "CAD Sheet 6",
        badge: "2D 6",
        title: "CAD Sheet 6: Master Bedroom TV Unit External & Internal Elevation Plan",
        src: "/assets/master-bedroom-tv-page6.jpg",
        desc: "Architectural 2D elevation drawing (Page 6) detailing 1335mm wide floating curved TV console (300mm H × 350mm D, 200mm FFL gap), 14016 VNR Malmok Natal Walnut finish, 46247 WVN Natural Reed 2-drawer front panels (525mm each), 14016 top open box (1335×300mm), 75mm/36mm layered backlit feature wall panels with PS cutouts, and LED strip light provisions."
      },
      {
        id: "tv-3d-1",
        type: "3D CGI Render",
        shortLabel: "3D Render",
        badge: "3D 1",
        title: "3D Photorealistic Render – Master Bedroom TV Unit & Wardrobe Suite",
        src: "/assets/master-bedroom-tv-3d-render.jpg",
        desc: "Photorealistic 3D visualization illustrating the bespoke Master Bedroom TV unit in 14016 Malmok Natal Walnut and textured Natural Reed panels with warm LED halo backlighting, mounted TV, floating curved credenza, top open display shelf, and adjacent bay window seating & wardrobe."
      }
    ],
    pdfSheets: [
      {
        page: 6,
        title: "Page 6: Master Bedroom TV Unit External & Internal Elevation Plan",
        image: "/assets/master-bedroom-tv-page6.jpg",
        desc: "Full working drawing (Page 6) showing External & Internal elevation views, 1335mm floating TV console, dual 525mm drawers, top open box, and layered backlit wall panels."
      }
    ],
    description: "Architectural 2D working drawings and photorealistic 3D visualization for a bespoke Master Bedroom TV Unit (1335mm W × 350mm D × 300mm H floating console with 1577mm total wall feature height) designed at Cookscape, Chennai. Features a floating curved credenza with 143mm curved side returns, dual soft-close drawers in tactile 46247 WVN HC Natural Reed, rich 14016 VNR RH Malmok Natal Walnut framing, top open display shelf, and 3-tier layered acoustic back panels with integrated warm LED halo backlighting.",
    scope: "2D joinery drafting in AutoCAD, curved carcass engineering, electrical PS point cutouts, LED strip lighting channels, Merino laminate scheduling, EBCO soft-close runners, and 3D photorealistic CGI rendering in 3ds Max.",
    software: ["AutoCAD 2D", "3ds Max", "V-Ray", "Joinery Detailing"],
    palette: [
      "14016 VNR RH Malmok Natal Walnut (Merino)",
      "46247 WVN HC Natural Reed (Merino)",
      "Warm 3000K LED Halo Cove Lighting",
      "Half White BWP Carcass"
    ],
    technicalUnitsList: {
      dimensions: {
        overall: "TV Wall Span: 1335mm W × 350mm D × 1877mm Total Height (200mm Gap from FFL)",
        consoleBase: "Floating Base: 1335mm W × 350mm D × 300mm H with dual 143mm curved radius ends",
        drawers: "Two Drawers: 525mm W × 264mm Internal H in 46247 Natural Reed",
        openBox: "Top Open Display Box: 1335mm W × 300mm D × 300mm H in 14016 Walnut",
        backPanels: "Layered Back Panels: Left 350×1277mm (36mm thk), Center 615×1277mm (75mm thk), Right 370×1277mm (36mm thk)"
      },
      floorUnits: [
        { code: "TV-BASE-1335", type: "Floating Curved TV Console", width: "1335 mm", depth: "350 mm", desc: "Dual 525mm drawers in 46247 Natural Reed with soft-close EBCO runners, 14016 Malmok Natal Walnut countertop & 143mm curved side returns." },
        { code: "TV-DRW-01", type: "Left Storage Drawer", width: "525 mm", depth: "350 mm", desc: "Shutter finish 46247 Natural Reed, 264mm internal height with EBCO soft-close runners." },
        { code: "TV-DRW-02", type: "Right Storage Drawer", width: "525 mm", depth: "350 mm", desc: "Matching right drawer in 46247 Natural Reed with client scope handle." }
      ],
      wallUnits: [
        { code: "TV-OPN-1335", type: "Top SF Open Box", width: "1335 mm", depth: "300 mm", height: "300 mm", desc: "Overhead open display shelf with PS point cutout on panel in 14016 Malmok Natal Walnut." },
        { code: "TV-PNL-CTR", type: "Center TV Back Panel (75mm)", width: "615 mm", depth: "75 mm", height: "1277 mm", desc: "75mm thick feature back panel in 46247 Natural Reed with PS point cutouts for TV mounting and cable conceal." },
        { code: "TV-PNL-FLK", type: "Flanking Back Panels (Pair)", width: "350 & 370 mm", depth: "36 mm", height: "1277 mm", desc: "Pair of 36mm thick panels creating stepped depth relief for concealed vertical LED strip light channels (Light-Wall2Wall Scope)." }
      ],
      loftUnits: [],
      productionDetails: [
        { item: "Carcass Core Material", spec: "BWP (Boiling Water Proof) Marine Grade Plywood in Half White" },
        { item: "Shutter Type & Finish", spec: "CC Elite with 14016 VNR RH Malmok Natal Walnut & 46247 WVN HC Natural Reed (Merino)" },
        { item: "Curved End Detailing", spec: "Both side curved finish (143mm radius profile) in 14016 finish" },
        { item: "Drawer Runners", spec: "EBCO Soft Closing Undermount / Tandem Runners" },
        { item: "Handles", spec: "Client Scope" },
        { item: "Backlight Provision", spec: "Need strip light provision on both sides behind layered panels (Light-Wall2Wall Scope)" },
        { item: "Electrical Cutouts", spec: "PS point cutouts on top open box panel and center TV back panel" },
        { item: "Edge Banding", spec: "Match exactly with respective shutter laminates" }
      ]
    }
  },

  Bedroom: {
    id: 2,
    roomKey: "Bedroom",
    title: "Project 2: Master Bedroom Suite & Walk-In Wardrobe Architecture",
    categories: ["Bedroom", "Bedroom Design", "Wardrobe Design", "Residential Interior Design", "3D Visualization"],
    categoryLabel: "Bedroom Plan · 3D Renders & Wardrobe CAD",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    isTechnicalCAD: true,
    has3DRenders: true,
    galleryImages: [
      {
        id: "bed-3d-1",
        type: "3D CGI Render",
        shortLabel: "3D Suite 1",
        badge: "3D 1",
        title: "Serenade Master Suite & Acoustic Headboard Wall",
        src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
        desc: "3D CGI perspective showing plush acoustic fabric headboard wall, acoustic fluted oak battens, integrated reading lights, and soft sheer linen drapes."
      },
      {
        id: "bed-3d-2",
        type: "3D CGI Render",
        shortLabel: "3D Wardrobe 2",
        badge: "3D 2",
        title: "Bespoke Tinted Glass Walk-In Wardrobe & Vanity",
        src: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80",
        desc: "Luxury walk-in closet featuring anodized bronze aluminum profiles, smoked glass doors, internal vertical LED strip lighting, and velvet-lined accessory drawers."
      },
      {
        id: "bed-3d-3",
        type: "3D CGI Render",
        shortLabel: "3D Guest 3",
        badge: "3D 3",
        title: "Guest Bedroom Suite with Floating Millwork",
        src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        desc: "Warm minimalist guest room concept with cantilevered floating nightstands, seamless wardrobe with concealed finger-pulls, and indirect linear warm glow lighting."
      },
      {
        id: "bed-2d-1",
        type: "2D Joinery Plan",
        shortLabel: "2D Wardrobe 1",
        badge: "2D 1",
        title: "CAD Sheet 1: Master Wardrobe Section & Internal Joinery Elevations",
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
        desc: "Detailed 2D elevation drawing displaying carcass heights, hanging rail clearances, drawer divisions, and ceiling crown detail."
      }
    ],
    description: "Holistic master bedroom sanctuary and custom wardrobe architecture. Balances soothing acoustic textures, warm neutral tones, bespoke floating millwork, and high-end glass walk-in wardrobe storage.",
    scope: "Space planning, headboard wall detailing, 2D wardrobe elevations, material schedules, and 3D photorealistic visualization in 3ds Max.",
    software: ["3ds Max", "AutoCAD", "SketchUp", "V-Ray"],
    palette: ["Cashmere Gray", "Smoked Bronze Glass", "Natural American Walnut", "Warm Brushed Gold"],
    technicalUnitsList: {
      dimensions: {
        overall: "Master Suite: 4800mm × 4200mm • Wardrobe Room: 2800mm × 2400mm",
        bedWall: "Headboard Feature Wall: 4200mm span × 2900mm ceiling height",
        wardrobeRun: "L-Shaped Walk-in Closet: 2800mm + 2400mm runs (Depth 600mm)",
        vanityIsland: "Central Vanity & Accessory Island: 1200mm × 800mm"
      },
      floorUnits: [
        { code: "BED-MB-01", type: "King Bed Platform", width: "2000 × 2100 mm", depth: "Platform Base", desc: "Upholstered king platform bed with concealed under-bed linear glow." },
        { code: "NS-FL-01", type: "Floating Nightstand (Left)", width: "550 × 400 mm", depth: "400 mm", desc: "Wall-mounted cantilevered nightstand with soft-close Blum undermount runner." },
        { code: "NS-FL-02", type: "Floating Nightstand (Right)", width: "550 × 400 mm", depth: "400 mm", desc: "Matching right-hand cantilevered nightstand with integrated USB-C outlets." },
        { code: "ISL-VN-01", type: "Jewelry Vanity Island", width: "1200 × 800 mm", depth: "800 mm", desc: "Glass-top display island with velvet-lined watch and jewelry organizer trays." }
      ],
      wallUnits: [
        { code: "HB-PNL-01", type: "Acoustic Headboard Wall", width: "4200 mm", depth: "65 mm", height: "2900 mm", desc: "Modular upholstered cashmere fabric panels framed by fluted acoustic walnut battens." },
        { code: "WDB-GL-01", type: "Smoked Glass Wardrobe A", width: "2800 mm", depth: "600 mm", height: "2700 mm", desc: "Bronze anodized aluminum framed smoked glass doors with sensor-activated vertical LED strips." },
        { code: "WDB-GL-02", type: "Smoked Glass Wardrobe B", width: "2400 mm", depth: "600 mm", height: "2700 mm", desc: "Secondary wardrobe run housing double hanging rods, pull-out trouser racks, and shoe shelves." }
      ],
      loftUnits: [
        { code: "WDB-LFT-01", type: "Overhead Wardrobe Loft", width: "5200 mm total", height: "450 mm", desc: "Continuous top storage loft for seasonal travel luggage and bedding with touch-latch mechanisms." }
      ],
      productionDetails: [
        { item: "Wardrobe Carcass", spec: "Marine Grade BWP Plywood finished in textured greige linen laminate" },
        { item: "Wardrobe Doors", spec: "4mm Toughened Smoked Grey Glass in Anodized Brushed Bronze Aluminum frame" },
        { item: "Internal Storage", spec: "Soft-close tandem drawers, hydraulic trouser racks, tie/belt organizers" },
        { item: "Lighting Integration", spec: "45° angle aluminum profile 3000K warm LED strips recessed into carcass uprights" }
      ]
    }
  },

  "Living Room": {
    id: 3,
    roomKey: "Living Room",
    title: "Project 3: The Alabaster Haven Residence & Penthouse Living Architecture",
    categories: ["Living Room", "Living Room Design", "Residential Interior Design", "3D Visualization"],
    categoryLabel: "Living Room Plan · 3D Renders & Space CAD",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    isTechnicalCAD: true,
    has3DRenders: true,
    galleryImages: [
      {
        id: "liv-3d-1",
        type: "3D CGI Render",
        shortLabel: "3D Lounge 1",
        badge: "3D 1",
        title: "The Alabaster Haven Living Lounge & Curved Seating",
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        desc: "Open-plan conversation salon featuring organic curved bouclé sectional sofa, monolithic Roman travertine coffee table, and fluted acoustic timber accents."
      },
      {
        id: "liv-3d-2",
        type: "3D CGI Render",
        shortLabel: "3D Penthouse 2",
        badge: "3D 2",
        title: "Warm Travertine Penthouse Living & Dining Salon",
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        desc: "Panoramic conversation salon defined by low-slung seating, arched display niches, ambient indirect lighting coves, and 8-seater travertine dining table."
      },
      {
        id: "liv-3d-3",
        type: "3D CGI Render",
        shortLabel: "3D Villa 3",
        badge: "3D 3",
        title: "Minimalist Architectural Villa Spatial Visualization",
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        desc: "Photorealistic CGI lighting study showcasing architectural light wells, raw limestone elements, exposed microcement walls, and warm timber micro-textures."
      },
      {
        id: "liv-2d-1",
        type: "2D Space Plan",
        shortLabel: "2D Layout 1",
        badge: "2D 1",
        title: "CAD Sheet 1: Architectural Space Planning & Circulation Layout",
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
        desc: "Dimensioned furniture layout detailing seating clearances, TV viewing distances, dining circulation zones, and ceiling false lighting coves."
      }
    ],
    description: "Contemporary luxury open-concept living environment created for high-end residential apartments and penthouses. Emphasizes organic spatial geometry, tactile natural travertine, warm lighting physics, and fluid circulation between conversation and dining zones.",
    scope: "Space planning, furniture layout CAD drafting, 3D architectural CGI modeling in 3ds Max, false ceiling cove details, and material specification.",
    software: ["3ds Max", "AutoCAD 2D", "V-Ray", "Photorealistic CGI"],
    palette: ["Ivory Bouclé", "Roman Travertine", "Smoked Oak Battens", "Champagne Brass", "Limestone Sand"],
    technicalUnitsList: {
      dimensions: {
        overall: "Open Living & Dining Salon: 7800mm × 5400mm",
        seatingZone: "Conversation Salon: 5400mm × 4600mm",
        diningZone: "Dining Suite: 4200mm × 3200mm",
        ceilingHeight: "Drop False Ceiling: 3100mm with 150mm Cove Drop"
      },
      floorUnits: [
        { code: "SOFA-CRV-01", type: "Curved Modular Sectional", width: "3600 × 2400 mm", depth: "950 mm", desc: "Custom 3-piece organic curved sectional in stain-resistant Italian ivory bouclé." },
        { code: "TBL-TRV-01", type: "Monolithic Travertine Table", width: "1400 × 850 mm", depth: "380 mm", desc: "Honed Roman travertine cocktail table with bullnose softened edge details." },
        { code: "ARM-CH-01", type: "Sculptural Lounge Chairs (Pair)", width: "850 × 800 mm", depth: "750 mm", desc: "Pair of accent armchairs in cognac semi-aniline leather with blackened steel base." },
        { code: "DIN-TBL-01", type: "Travertine Dining Table", width: "2400 × 1050 mm", depth: "760 mm", desc: "Custom 8-seater dining table with dual sculptural travertine fluted pedestals." }
      ],
      wallUnits: [
        { code: "TV-UNT-01", type: "Media Feature Cladding Wall", width: "4800 mm", depth: "180 mm", height: "3100 mm", desc: "Backlit Roman travertine bookmatched panels flanked by vertical fluted oak acoustics." },
        { code: "NCH-ARC-01", type: "Arched Architectural Display Niche", width: "1600 mm", depth: "300 mm", height: "2600 mm", desc: "Recessed wall niches with concealed warm 2700K micro-cove halo lighting." }
      ],
      loftUnits: [
        { code: "COVE-CLG-01", type: "Perimeter False Ceiling Cove", width: "Full Perimeter Run", height: "150 mm drop", desc: "Continuous shadow gap and indirect cove illumination casting soft diffused ceiling glow." }
      ],
      productionDetails: [
        { item: "Wall Cladding", spec: "Natural Honed Roman Travertine (20mm slab) and FSC-certified White Oak fluted slats" },
        { item: "Upholstery Fabrics", spec: "Heavyweight commercial grade Italian bouclé (80,000 Martindale rub count)" },
        { item: "Metal Trims", spec: "PVD coated champagne bronze stainless steel shadow gap profiles" },
        { item: "Lighting Systems", spec: "Dimmable 2700K CRI 95+ warm white linear LED strips in concealed extruded channels" }
      ]
    }
  }
};

roomProjects.LivingVanity = roomProjects["Living Vanity"];
roomProjects.MasterBedroomTV = roomProjects["Master Bedroom TV Unit"];
roomProjects["Bedroom TV"] = roomProjects["Master Bedroom TV Unit"];

export const theSapphireResidenceProject = {
  id: 101,
  title: "Project 2: The Sapphire Residence – Modular Kitchen & Living Dining Pavilion",
  categories: ["Kitchen", "Living Vanity", "Living Room", "Dining Suite", "3D Visualization", "2D Floor Plans"],
  categoryLabel: "Open Living Suite · 3D Renders & 2D CAD",
  image: "/assets/kitchen-3d-render-2.jpg",
  isTechnicalCAD: true,
  has3DRenders: true,
  tabNames: ["Modular Kitchen", "Living Vanity", "Dining Suite"],
  description: "Turnkey luxury residential open-concept architecture. Features bespoke matte Champagne acrylic base cabinetry with EBCO soft-close tandem runners, jet black granite waterfall counters, integrated fluted glass crockery display, dual-tone living vanity with royal blue PU side panels, and master architectural lighting layout. Complete with millimeter-accurate 2D CAD working drawings and photorealistic 3D V-Ray visualizations.",
  scope: "Concept architecture, 3D photorealistic visualization, 2D AutoCAD fabrication drawings, joinery schedules, and MEP coordination.",
  software: ["AutoCAD 2D", "3ds Max", "V-Ray", "Photoshop"],
  palette: ["21187 HGL Champagne", "Royal Blue PU", "21054 SF Light Beige", "Jet Black Granite", "Natural Reed"],
  galleryImages: [
    {
      id: "p2-3d-1",
      type: "3D CGI Render",
      badge: "3D 1",
      shortLabel: "3D View 1",
      title: "3D Photorealistic Render – Open Kitchen & Dining Perspective",
      src: "/assets/kitchen-3d-render-2.jpg",
      desc: "Wide perspective showing spatial circulation, open-plan dining transition, 3-tier tandem drawer unit, built-in cooktop, and seamless ceiling loft shuttering."
    },
    {
      id: "p2-3d-2",
      type: "3D CGI Render",
      badge: "3D 2",
      shortLabel: "3D View 2",
      title: "3D Photorealistic Render – Living Vanity & Dining Niche",
      src: "/assets/living-vanity-3d-render.jpg",
      desc: "Photorealistic 3D visualization illustrating the dual-tone living vanity unit with royal blue PU side panels matching the crockery unit, light beige doors, granite countertop, and 1000mm high wall mirror."
    },
    {
      id: "p2-3d-3",
      type: "3D CGI Render",
      badge: "3D 3",
      shortLabel: "3D View 3",
      title: "3D Photorealistic Render – Bespoke Royal Blue Crockery Unit",
      src: "/assets/crockery-3d-render.jpg",
      desc: "Photorealistic 3D visualization showing the bespoke royal blue PU finish crockery unit with antique button handles, 3 base drawers, 18mm Nice Wood countertop, and overhead glass display cabinet."
    },
    {
      id: "p2-2d-1",
      type: "2D Working CAD",
      badge: "2D 1",
      shortLabel: "CAD Sheet 1",
      title: "CAD Sheet 1: Master 2D Floor Plan & Carcass Joinery Layout",
      src: "/assets/kitchen-2d-plan-page1.png",
      pdfFile: "/assets/docs/kitchen-page-1.pdf",
      desc: "Millimeter-accurate 2D layout (2285mm × 2675mm), floor unit layout, sink & hob positioning, wall unit demarcation, and master production schedule."
    },
    {
      id: "p2-2d-2",
      type: "2D Working CAD",
      badge: "2D 2",
      shortLabel: "CAD Sheet 2",
      title: "CAD Sheet 2: 3D Axonometric Wireframe & Corner Assembly",
      src: "/assets/kitchen-2d-iso-page2.png",
      pdfFile: "/assets/docs/kitchen-page-2.pdf",
      desc: "Axonometric 3D wireframe layout illustrating carcass joinery, FBCM-RT corner unit (1130mm × 980mm), appliance clearances, and work triangle flow."
    },
    {
      id: "p2-2d-3",
      type: "2D Working CAD",
      badge: "2D 3",
      shortLabel: "CAD Sheet 3",
      title: "CAD Sheet 3: Living Vanity External & Internal Elevation Plan",
      src: "/assets/living-vanity-page5.png",
      desc: "Architectural 2D elevation drawing detailing 745mm wide × 350mm deep base vanity unit, 21054 SF Light Beige shutters, PU side panels & skirting matching crockery blue, and 600mm × 1000mm wall mirror panel."
    },
    {
      id: "p2-2d-4",
      type: "2D Working CAD",
      badge: "2D 4",
      shortLabel: "CAD Sheet 4",
      title: "CAD Sheet 4: Crockery Unit Full Joinery Elevation",
      src: "/assets/kitchen-crockery-page4.png",
      pdfFile: "/assets/docs/kitchen-crockery-page-4.pdf",
      desc: "Detailed 2D elevations (900mm W × 450mm D × 2110mm H) showing 3 base drawers, 18mm Nice Wood countertop, and plain glass wall shutters."
    }
  ],
  technicalUnitsList: {
    dimensions: {
      overall: "4850mm × 3200mm Open Living & Culinary Suite"
    },
    floorUnits: [
      { code: "FBCM-RT", name: "Magic Corner Carousel Unit", size: "1130 × 980 × 850mm", finish: "21187 HGL Champagne" },
      { code: "F2D", name: "2-Shutter Sink Basin Carcass", size: "900 × 560 × 850mm", finish: "BWP Marine Grade Plywood" },
      { code: "F3DR", name: "3-Tier Tandem Cutlery Drawer", size: "600 × 560 × 850mm", finish: "EBCO Soft-Close Runners" }
    ],
    productionDetails: [
      { item: "Carcass Material", spec: "BWP Marine Grade Plywood (Waterproof IS:710)" },
      { item: "Shutter Laminate", spec: "21187 HGL Champagne (Kitchen) & 21054 SF Light Beige (Vanity)" },
      { item: "Hardware System", spec: "EBCO 1 Normal & 1 Soft Closing Hinge system with 3D adjustment" }
    ]
  }
};

export const portfolioProjects = [];

export const softwareSkills = [
  {
    name: "AutoCAD",
    category: "Technical Drafting & Detailing",
    level: 95,
    description: "Comprehensive 2D architectural drafting, space zoning, partition layouts, furniture clearance plans, electrical/ceiling demarcations, and precise construction elevations.",
    tags: ["2D Plans", "Elevations", "Working Drawings", "Detailing"]
  },
  {
    name: "SketchUp",
    category: "3D Spatial Modeling",
    level: 90,
    description: "Rapid 3D volumetric massing, layout planning, bespoke millwork conceptualization, and interactive spatial exploration for client walkthroughs.",
    tags: ["3D Massing", "Fast Concepting", "Custom Joinery", "Spatial Volumes"]
  },
  {
    name: "3ds Max",
    category: "CGI & Photorealistic Rendering",
    level: 92,
    description: "Advanced photorealistic interior rendering, physical material authoring (V-Ray / Corona), realistic lighting simulation, raytraced reflections, and texture detailing.",
    tags: ["V-Ray / Corona", "Photoreal Lighting", "Material Mapping", "High-End CGI"]
  },
  {
    name: "Unreal Engine",
    category: "Real-Time Walkthroughs",
    level: 82,
    description: "Real-time interactive architectural experiences, dynamic lighting setups (Lumen), and immersive virtual tours enabling clients to experience spaces in real-time.",
    tags: ["Real-Time Tours", "Lumen Lighting", "Interactive CGI", "Immersive Experience"]
  },
  {
    name: "Adobe Premiere Pro",
    category: "Cinematic Video Presentation",
    level: 85,
    description: "Post-production editing of architectural walkthroughs, color grading, cinematic motion sequencing, and high-impact client presentation reels.",
    tags: ["Video Editing", "Color Grading", "Walkthrough Reels", "Client Decks"]
  }
];

export const workExperience = [
  {
    role: "Interior Designer",
    company: "Cookscape",
    location: "Chennai, India",
    period: "2024 – October 2026",
    badge: "Recent",
    type: "Full-time",
    description: "Led end-to-end residential interior design engagements from initial client discovery to execution drawings and 3D presentations.",
    responsibilities: [
      "Developed bespoke residential interior concepts tailored to client preferences and lifestyle requirements.",
      "Prepared meticulous 2D floor plans, elevation drawings, and fabrication-ready joinery specifications.",
      "Planned ergonomic furniture layouts, false ceiling configurations, and technical interior detailing.",
      "Curated and selected premium laminates, veneers, natural stone, colour palettes, and decorative hardware.",
      "Coordinated continuously with clients, translating feedback into seamless design iterations.",
      "Presented compelling 2D plans and photorealistic 3D visualizations to secure client approvals."
    ]
  },
  {
    role: "3D Designer",
    company: "Deo Verse",
    location: "Chennai, India",
    period: "2022 – 2024",
    badge: "Foundational",
    type: "Full-time",
    description: "Specialized in 3D architectural visualization, spatial digital modeling, and photorealistic texture and lighting production.",
    responsibilities: [
      "Created highly detailed 3D interior models for high-end residential and commercial spaces.",
      "Produced realistic renderings using 3ds Max and SketchUp with advanced lighting setups.",
      "Selected materials, tactile textures, color schemes, and finish combinations.",
      "Incorporated fast-paced design revisions based on senior architect and client feedback."
    ]
  }
];

export const education = [
  {
    degree: "B.E. Electronics and Communication Engineering (ECE)",
    institution: "Jayaraj Annapackiam CSI College of Engineering",
    location: "Tamil Nadu, India",
    period: "2018 – 2022",
    description: "Technical engineering foundation combining analytical problem-solving, structural precision, and systems design, directly powering expertise in architectural CAD, accurate scale drafting, and computing technologies in 3D visualization."
  }
];

export const designPhilosophy = [
  {
    quote: "A truly luxurious space is not defined by excess, but by the quiet harmony of proportion, texture, and light.",
    author: "Anitha Roselin S",
    title: "Design Philosophy"
  }
];
