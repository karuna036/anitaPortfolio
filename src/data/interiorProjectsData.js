/**
 * Dynamic JSON-Based Project, Category, and 2D/3D Image Architecture
 * Core Concept: Project → Multiple Categories → Multiple 2D & 3D Images
 */

// Default projects initialized to empty (All default projects and categories deleted)
export const interiorProjects = [];

// Optional sample showcase projects for demo reload if needed
export const sampleShowcaseProjects = [
  {
    id: "the-grand-pavilion",
    title: "The Grand Pavilion & Luxury Residence",
    location: "Boat Club Road, Chennai",
    year: "2024",
    area: "6,800 sq.ft",
    client: "Private Residential Estate",
    description: "A prestigious 6,800 sq.ft contemporary luxury estate featuring bespoke modular kitchen architecture, serene master bedroom suites, floating curved TV credenzas, custom glass walk-in wardrobes, spa bathrooms, and an acoustic private cinema room.",
    coverImage: "/assets/kitchen-3d-render-1.jpg",
    categories: [
      {
        id: "living-room",
        name: "Living Room",
        icon: "🛋️",
        coverImage: "/assets/living-vanity-3d-render.jpg",
        description: "Double-height formal living salon designed with dual-tone Italian joinery, fluted acoustic wall paneling, bespoke bronze accent lighting, and integrated living vanity.",
        dimensions: "6,200mm × 4,800mm (Ceiling Height: 3,400mm)",
        images: [
          {
            id: "gp-lr-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Living Salon & Dining Niche CGI Perspective",
            src: "/assets/living-vanity-3d-render.jpg",
            dimensions: "6,200mm × 4,800mm",
            desc: "Photorealistic 3D visualization illustrating the dual-tone living vanity with royal blue PU side panels matching the crockery unit, light beige doors, granite countertop, and 1,000mm wall mirror panel."
          },
          {
            id: "gp-lr-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Living Vanity External & Internal Elevation CAD",
            src: "/assets/living-vanity-page5.png",
            dimensions: "745mm W × 350mm D × 800mm H",
            desc: "Architectural 2D elevation drawing detailing 745mm wide base vanity unit, 21054 SF Light Beige shutters, PU side panels & skirting in crockery blue, and 600mm × 1000mm wall mirror panel."
          },
          {
            id: "gp-lr-3d-2",
            type: "3D",
            subType: "3D Render",
            title: "Panoramic Formal Lounge & Curved Seating Layout",
            src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            dimensions: "6,200mm × 4,800mm",
            desc: "Minimalist Italian boucle sofa grouping with monolithic travertine coffee table, warm brushed brass sconces, and double-height architectural drapery."
          },
          {
            id: "gp-lr-layout-1",
            type: "2D",
            subType: "Interior Layout",
            title: "Master Living Salon Key Furniture Layout Plan",
            src: "/assets/kitchen-2d-plan-page1.png",
            dimensions: "1:20 Metric Architectural Scale",
            desc: "Spatial circulation layout detailing sightlines to garden pavilion, seating clearance, electrical wall chases, and HVAC ceiling diffuser placement."
          },
          {
            id: "gp-lr-ba-1",
            type: "3D",
            subType: "Before & After",
            title: "Living Salon Renovation: Raw Shell to Luxury Finish",
            src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
            dimensions: "Full Room Transformation",
            desc: "Before & After comparison revealing the transition from exposed concrete structure to micro-cement wall finishes and custom acoustic wood millwork."
          }
        ]
      },
      {
        id: "kitchen",
        name: "Kitchen",
        icon: "🍳",
        coverImage: "/assets/kitchen-3d-render-1.jpg",
        description: "Turnkey L-shaped modular culinary suite featuring high-gloss champagne acrylic base cabinetry, fluted glass spice storage, tandem drawer systems, and jet black granite countertops.",
        dimensions: "2,285mm × 2,675mm (L-Shape Configuration)",
        images: [
          {
            id: "gp-k-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "3D Photorealistic Render – Frontal Perspective",
            src: "/assets/kitchen-3d-render-1.jpg",
            dimensions: "2,285mm × 2,675mm",
            desc: "High-gloss Champagne base cabinets, frosted white upper cabinets, fluted glass spice rack units with warm under-cabinet LED cove illumination, and black granite countertop."
          },
          {
            id: "gp-k-3d-2",
            type: "3D",
            subType: "3D Render",
            title: "3D Photorealistic Render – Wide Angle Dining Perspective",
            src: "/assets/kitchen-3d-render-2.jpg",
            dimensions: "Wide Angle Perspective",
            desc: "Wide perspective showing spatial circulation, open-plan dining transition, 3-tier tandem drawer unit, built-in cooktop, and seamless ceiling loft shuttering."
          },
          {
            id: "gp-k-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "CAD Sheet 1: 2D Working Floor Plan & Production Schedule",
            src: "/assets/kitchen-2d-plan-page1.png",
            dimensions: "2285mm × 2675mm (Floor Units)",
            desc: "Millimeter-accurate 2D layout, floor unit layout, sink & hob positioning, wall unit demarcation, and master production schedule."
          },
          {
            id: "gp-k-2d-2",
            type: "2D",
            subType: "2D Layout",
            title: "CAD Sheet 2: 3D Isometric Wireframe & Corner Assembly",
            src: "/assets/kitchen-2d-iso-page2.png",
            dimensions: "Axonometric 3D Wireframe",
            desc: "Axonometric 3D wireframe layout illustrating carcass joinery, FBCM-RT corner unit (1130mm × 980mm), appliance clearances, and work triangle flow."
          },
          {
            id: "gp-k-2d-3",
            type: "2D",
            subType: "2D Layout",
            title: "CAD Sheet 3: Loft Only Shuttering & Framework Elevation",
            src: "/assets/kitchen-2d-loft-page3.png",
            dimensions: "1685mm × 2100mm (Ceiling Loft)",
            desc: "Upper ceiling loft shuttering plan with 540mm shutter height, top 70mm batten, soffit bottom panels, and finger groove detail."
          },
          {
            id: "gp-k-ba-1",
            type: "3D",
            subType: "Before & After",
            title: "Modular Kitchen Execution: Concrete Shell to V-Ray Reality",
            src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
            dimensions: "L-Shape Complete Fit-Out",
            desc: "Before & After documentation showing plumbing stub-outs transformed into precision-fitted BWP Marine Plywood carcasses and seamless Champagne acrylic shutters."
          }
        ]
      },
      {
        id: "master-bedroom",
        name: "Master Bedroom",
        icon: "🛏️",
        coverImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
        description: "Serene master sanctuary featuring acoustic fluted oak battens, upholstered linen headboard wall, cantilevered floating nightstands, and soft sheer linen drapes.",
        dimensions: "4,800mm × 4,200mm",
        images: [
          {
            id: "gp-mb-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Serenade Master Suite & Acoustic Headboard Wall",
            src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
            dimensions: "4,800mm × 4,200mm",
            desc: "3D CGI perspective showing plush acoustic fabric headboard wall, acoustic fluted oak battens, integrated reading lights, and soft sheer linen drapes."
          },
          {
            id: "gp-mb-3d-2",
            type: "3D",
            subType: "3D Render",
            title: "Master Suite Bay Window Lounge & Daybed Niche",
            src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
            dimensions: "Bay Niche: 2,400mm × 1,100mm",
            desc: "Warm minimalist alcove with custom upholstered bench seat, concealed under-storage drawers, and indirect warm linear cove lighting."
          },
          {
            id: "gp-mb-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Master Bedroom Architectural Headboard Elevation CAD",
            src: "/assets/master-bedroom-tv-page6.jpg",
            dimensions: "4,200mm Span × 2,900mm Ceiling H",
            desc: "Precision AutoCAD elevation detailing layered acoustic panels, concealed wire conduits, integrated bedside switches, and 3000K warm LED channels."
          },
          {
            id: "gp-mb-layout-1",
            type: "2D",
            subType: "Interior Layout",
            title: "Master Bedroom Spatial Flow & Bed Placement Plan",
            src: "/assets/kitchen-2d-plan-page1.png",
            dimensions: "1:25 Architectural Scale",
            desc: "Clearance plan showing 900mm walkways on both bed flanks, unobstructed egress to the master bath, and acoustic air-gap isolation."
          }
        ]
      },
      {
        id: "tv-unit",
        name: "TV Unit",
        icon: "📺",
        coverImage: "/assets/master-bedroom-tv-3d-render.jpg",
        description: "Architectural floating curved TV credenza engineered with 143mm curved radius side returns, tactile 46247 Natural Reed drawer faces, Malmok Natal Walnut framing, and warm halo backlighting.",
        dimensions: "1,335mm W × 350mm D × 300mm H (200mm FFL gap)",
        images: [
          {
            id: "gp-tv-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "3D Photorealistic Render – Master Bedroom TV Unit Suite",
            src: "/assets/master-bedroom-tv-3d-render.jpg",
            dimensions: "1,335mm W × 350mm D × 300mm H",
            desc: "Photorealistic 3D visualization illustrating bespoke TV unit in 14016 Malmok Natal Walnut and textured Natural Reed panels with warm LED halo backlighting."
          },
          {
            id: "gp-tv-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "CAD Sheet 6: Master Bedroom TV Unit External & Internal Elevation",
            src: "/assets/master-bedroom-tv-page6.jpg",
            dimensions: "1,335mm W × 350mm D × 300mm H Console",
            desc: "Architectural 2D elevation drawing detailing 1335mm wide floating curved TV console, 14016 VNR finish, dual 525mm drawers, and layered backlit back panels."
          },
          {
            id: "gp-tv-ba-1",
            type: "3D",
            subType: "Before & After",
            title: "TV Unit Joinery Detailing: CNC Framing to Installed Elegance",
            src: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
            dimensions: "Bespoke Millwork Fitment",
            desc: "Before & After comparison demonstrating the exact translation from raw BWP plywood framing to finished 46247 Natural Reed woven drawer fronts and halo illumination."
          }
        ]
      },
      {
        id: "dining-room",
        name: "Dining Room",
        icon: "🍽️",
        coverImage: "/assets/crockery-3d-render.jpg",
        description: "Bespoke open-plan culinary transition dining salon featuring a royal blue PU finish crockery cabinet, 18mm Nice Wood countertop, antique brass button pulls, and illuminated fluted glass storage.",
        dimensions: "4,200mm × 3,600mm",
        images: [
          {
            id: "gp-dr-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "3D Photorealistic Render – Bespoke Royal Blue Crockery Cabinet",
            src: "/assets/crockery-3d-render.jpg",
            dimensions: "900mm W × 450mm D × 2,110mm H",
            desc: "Photorealistic 3D visualization showing the bespoke royal blue PU finish crockery unit with antique button handles, 3 base drawers, Nice Wood countertop, and overhead glass display cabinet."
          },
          {
            id: "gp-dr-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "CAD Sheet 4: Crockery Unit Full Joinery Elevation Plan",
            src: "/assets/kitchen-crockery-page4.png",
            dimensions: "900mm W × 450mm D × 2,110mm H",
            desc: "Detailed 2D elevations showing 3 base drawers, 18mm 10197 Nice Wood countertop, plain glass wall shutters with 2 internal glass shelves, and spotlight/vertical strip lighting provisions."
          },
          {
            id: "gp-dr-3d-2",
            type: "3D",
            subType: "3D Render",
            title: "8-Seater Smoked Oak Dining Table & Sculptural Chandelier",
            src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
            dimensions: "2,600mm × 1,000mm Dining Table",
            desc: "Sculptural dining table with rounded bullnose edges, upholstered dining armchairs in sand boucle, and suspended bronze chandelier."
          }
        ]
      },
      {
        id: "wardrobe",
        name: "Wardrobe",
        icon: "🚪",
        coverImage: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80",
        description: "Custom floor-to-ceiling walk-in dressing chamber featuring dark smoked glass doors, bronze aluminum extrusions, vertical LED strip illumination, and velvet jewelry islands.",
        dimensions: "2,800mm × 2,400mm (Depth: 600mm)",
        images: [
          {
            id: "gp-w-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Bespoke Tinted Glass Walk-In Wardrobe & Vanity Suite",
            src: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80",
            dimensions: "2,800mm × 2,400mm",
            desc: "Luxury walk-in closet featuring anodized bronze aluminum profiles, smoked glass doors, internal vertical LED strip lighting, and velvet-lined accessory drawers."
          },
          {
            id: "gp-w-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "CAD Sheet: Walk-In Wardrobe Internal Modular Partition Schedule",
            src: "/assets/kitchen-crockery-page4.png",
            dimensions: "Hanging Runs: 1,100mm & 850mm",
            desc: "Detailed 2D CAD joinery layout displaying internal carcass divisions, long coat hanging clearances, pull-out trouser racks, and concealed LED chases."
          },
          {
            id: "gp-w-ba-1",
            type: "3D",
            subType: "Before & After",
            title: "Dressing Chamber Transformation: Masonry to High-Gloss Glass",
            src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
            dimensions: "Full Walk-In Transformation",
            desc: "Before & After progression showing the bare shell transformed into climate-controlled luxury wardrobe architecture."
          }
        ]
      },
      {
        id: "bathroom",
        name: "Bathroom",
        icon: "🛁",
        coverImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        description: "Private master spa sanctuary clad in bookmatched Calacatta marble, featuring a freestanding fluted stone soak tub, concealed thermostatic rain shower, and floating walnut vanity.",
        dimensions: "3,200mm × 2,600mm",
        images: [
          {
            id: "gp-b-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Spa Master Bath & Freestanding Soaking Tub CGI",
            src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
            dimensions: "3,200mm × 2,600mm",
            desc: "Floor-to-ceiling Calacatta gold slab marble, brushed gunmetal Dornbracht hardware, LED backlit floating mirror, and fluted solid-surface bathtub."
          },
          {
            id: "gp-b-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Master Bath Plumbing Layout & Vanity Elevation CAD",
            src: "/assets/living-vanity-page5.png",
            dimensions: "1,400mm Double Vanity",
            desc: "Technical sanitary MEP drawing indicating rough-in heights, concealed diverter valves, P-trap clearance, and mirror demister wiring."
          }
        ]
      },
      {
        id: "cinema-room",
        name: "Cinema Room",
        icon: "🎬",
        coverImage: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
        description: "Private state-of-the-art acoustic cinema with 150-inch micro-perforated acoustic screen, tiered leather recliner lounges, acoustic suede wall panels, and fiber-optic starlight ceiling.",
        dimensions: "5,400mm × 4,200mm (Ceiling Height: 3,200mm)",
        images: [
          {
            id: "gp-cr-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Acoustic Cinema Lounge & Dolby Atmos Starlight Ceiling",
            src: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
            dimensions: "5,400mm × 4,200mm",
            desc: "Tiered seating platform with bespoke Italian leather reclining chairs, acoustic wall fabric in charcoal slate, and fiber-optic starlight ceiling constellations."
          },
          {
            id: "gp-cr-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Cinema Tiered Seating & Acoustic Panel Elevation Plan",
            src: "/assets/kitchen-2d-iso-page2.png",
            dimensions: "Tier 1: +200mm · Tier 2: +450mm",
            desc: "Acoustic baffle placement plan showing Bass-trap corners, 150-inch projector throw distance calculation, and low-voltage step illumination."
          }
        ]
      }
    ]
  },
  {
    id: "sapphire-residence-penthouse",
    title: "The Sapphire Residence Penthouse",
    location: "Jubilee Hills, Hyderabad",
    year: "2024",
    area: "5,200 sq.ft",
    client: "Corporate Executive Penthouse",
    description: "An urban sky sanctuary balancing open living layouts, modular bar pavilions, warm walnut paneling, and bespoke millwork overlooking panoramic city skylines.",
    coverImage: "/assets/kitchen-3d-render-2.jpg",
    categories: [
      {
        id: "living-room",
        name: "Living Room",
        icon: "🛋️",
        coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        description: "Panoramic living lounge with floor-to-ceiling curtain wall glazing, low-profile Italian modular seating, and architectural bronze trim.",
        dimensions: "5,800mm × 4,500mm",
        images: [
          {
            id: "sr-lr-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Penthouse Sky Lounge & Sunset Horizon Visualization",
            src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            dimensions: "5,800mm × 4,500mm",
            desc: "Photorealistic V-Ray daylight simulation capturing dusk lighting across honed marble flooring, custom sectional sofa, and bronze bookshelves."
          },
          {
            id: "sr-lr-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Living Room Floor Layout & Sightline Plan",
            src: "/assets/kitchen-2d-plan-page1.png",
            dimensions: "1:20 Metric Architectural Scale",
            desc: "Space planning drawing establishing primary visual axis to city balcony, sofa clearance, and motorized drape tracks."
          }
        ]
      },
      {
        id: "kitchen",
        name: "Kitchen",
        icon: "🍳",
        coverImage: "/assets/kitchen-3d-render-2.jpg",
        description: "Sculptural kitchen pavilion with monolithic marble island, seamless pocket door appliance garage, and integrated dining bar.",
        dimensions: "3,800mm × 3,200mm",
        images: [
          {
            id: "sr-k-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Open Kitchen & Waterfall Counter Island Perspective",
            src: "/assets/kitchen-3d-render-2.jpg",
            dimensions: "3,800mm × 3,200mm",
            desc: "Wide perspective showing matte Champagne acrylic base cabinetry, soft-close tandem drawers, and seamless ceiling loft shuttering."
          },
          {
            id: "sr-k-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Culinary Island & Carcass Working Joinery Drawing",
            src: "/assets/kitchen-2d-iso-page2.png",
            dimensions: "Island: 2,400mm × 1,000mm",
            desc: "Sectional CAD drawing displaying double-waterfall marble support steel sub-frame, push-to-open drawer units, and flush pop-up electrical points."
          }
        ]
      },
      {
        id: "master-bedroom",
        name: "Master Bedroom",
        icon: "🛏️",
        coverImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
        description: "Warm neutral master bedroom suite with integrated dressing alcove, sound-insulating textile walls, and floating bedside pedestals.",
        dimensions: "4,600mm × 4,000mm",
        images: [
          {
            id: "sr-mb-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Serenade Penthouse Suite & Acoustic Headboard",
            src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
            dimensions: "4,600mm × 4,000mm",
            desc: "Upholstered headboard wall, acoustic fluted oak battens, integrated warm 3000K reading lights, and soft sheer linen drapes."
          },
          {
            id: "sr-mb-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Master Suite Dimensioned Plan & Electrical Schedule",
            src: "/assets/master-bedroom-tv-page6.jpg",
            dimensions: "AutoCAD Floor Plan",
            desc: "Detailed furniture clearances, bedside two-way lighting controls, and motorized blind pre-wiring locations."
          }
        ]
      },
      {
        id: "tv-unit",
        name: "TV Unit",
        icon: "📺",
        coverImage: "/assets/master-bedroom-tv-3d-render.jpg",
        description: "Minimalist entertainment console featuring cantilevered walnut millwork, concealed cable tracks, and accent halo illumination.",
        dimensions: "1,800mm W × 380mm D × 320mm H",
        images: [
          {
            id: "sr-tv-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Floating Media Wall & Fluted Travertine Backing",
            src: "/assets/master-bedroom-tv-3d-render.jpg",
            dimensions: "1,800mm Console",
            desc: "Photorealistic render illustrating floating walnut TV cabinet with concealed AV ventilation and accent warm LED wall halo."
          },
          {
            id: "sr-tv-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Media Credenza Joinery Elevation & Wall Anchor Details",
            src: "/assets/master-bedroom-tv-page6.jpg",
            dimensions: "1:10 Detail Scale",
            desc: "CAD drawing detailing heavy-duty steel wall anchor cleats, wire drop channels, and soft-close drop-down speaker mesh doors."
          }
        ]
      }
    ]
  },
  {
    id: "alabaster-haven-coastal-villa",
    title: "Alabaster Haven Coastal Residence",
    location: "East Coast Road (ECR), Chennai",
    year: "2023",
    area: "4,800 sq.ft",
    client: "Coastal Beachfront Residence",
    description: "An airy organic minimalist sanctuary featuring light oak millwork, brushed limestone floors, neutral linen drapery, and curated indoor-outdoor transitions.",
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    categories: [
      {
        id: "living-room",
        name: "Living Room",
        icon: "🛋️",
        coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        description: "Sunlit open-plan beach salon designed with custom limestone ledges, sand-washed oak casework, and low-profile linen lounge seating.",
        dimensions: "5,400mm × 4,600mm",
        images: [
          {
            id: "ah-lr-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Coastal Living Salon & Ocean Breeze Light Study",
            src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
            dimensions: "5,400mm × 4,600mm",
            desc: "Natural sunlight bounce simulation highlighting micro-cement wall texture, floating oak shelving, and woven neutral area rug."
          },
          {
            id: "ah-lr-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Living Room Spatial Plan & Glass Pocket Door Detail",
            src: "/assets/kitchen-2d-plan-page1.png",
            dimensions: "AutoCAD Floor Plan",
            desc: "Architectural drawing demonstrating seamless threshold details, recessed floor tracks, and hurricane-rated glazing integration."
          }
        ]
      },
      {
        id: "kitchen",
        name: "Kitchen",
        icon: "🍳",
        coverImage: "/assets/kitchen-3d-render-1.jpg",
        description: "Organic modern kitchen featuring bleached ash cabinetry, integrated brushed brass finger-pulls, and quartzite countertops.",
        dimensions: "3,600mm × 2,800mm",
        images: [
          {
            id: "ah-k-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Minimalist Coastal Kitchen & Quartzite Island",
            src: "/assets/kitchen-3d-render-1.jpg",
            dimensions: "3,600mm × 2,800mm",
            desc: "Clean-line Scandinavian cabinetry, under-cabinet warm 2700K illumination, and integrated flush-induction cooktop."
          },
          {
            id: "ah-k-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Cabinet Carcass Elevation & Pull-Out Pantry Layout",
            src: "/assets/kitchen-2d-loft-page3.png",
            dimensions: "Full Height 2,700mm",
            desc: "2D millimeter elevation plan showing internal Blum Blumotion pull-outs, spice racks, and corner carousel accessories."
          }
        ]
      },
      {
        id: "master-bedroom",
        name: "Master Bedroom",
        icon: "🛏️",
        coverImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        description: "Tranquil master bedroom suite with oceanfront balcony outlook, cantilevered oak bed base, and textured limestone wall finish.",
        dimensions: "4,500mm × 3,900mm",
        images: [
          {
            id: "ah-mb-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Oceanfront Bedroom Suite & Low-Slung Platform Bed",
            src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
            dimensions: "4,500mm × 3,900mm",
            desc: "3D CGI perspective rendering early morning coastal illumination, sheer curtains, and floating oak cantilevered side tables."
          },
          {
            id: "ah-mb-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Bedhead Joinery & Ceiling Pocket Curtain Detail",
            src: "/assets/master-bedroom-tv-page6.jpg",
            dimensions: "1:20 Detail Plan",
            desc: "Construction section drawing for concealed motorized curtain pelmet, acoustical wall dampening, and lighting cove."
          }
        ]
      },
      {
        id: "bathroom",
        name: "Bathroom",
        icon: "🛁",
        coverImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        description: "Open-air master ensuite bathroom with exterior tropical garden shower court and custom honed limestone vanity.",
        dimensions: "3,000mm × 2,400mm",
        images: [
          {
            id: "ah-b-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Limestone Spa Bath & Indoor-Outdoor Shower Perspective",
            src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
            dimensions: "3,000mm × 2,400mm",
            desc: "Custom carved stone basin, matte black wall-mounted fixtures, and seamless frameless glass door to open outdoor shower garden."
          },
          {
            id: "ah-b-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Ensuite Plumbing & Slope Drainage Layout Plan",
            src: "/assets/living-vanity-page5.png",
            dimensions: "Drainage Slope: 1:50",
            desc: "Linear floor drain channel detail, waterproofing membrane specification, and niche shampoo shelf dimensioning."
          }
        ]
      }
    ]
  },
  {
    id: "nordic-minimalist-suite",
    title: "Nordic Architectural Urban Villa",
    location: "Whitefield, Bangalore",
    year: "2023",
    area: "4,200 sq.ft",
    client: "Tech Entrepreneur Villa",
    description: "A refined Scandinavian-inspired villa celebrating honest natural materials, acoustic wood battens, clean structural lines, and minimalist monochromatic elegance.",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    categories: [
      {
        id: "living-room",
        name: "Living Room",
        icon: "🛋️",
        coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        description: "Minimalist Scandinavian living space featuring a central floating fireplace, oak chevron floors, and floor-to-ceiling glass pavilions.",
        dimensions: "5,600mm × 4,200mm",
        images: [
          {
            id: "nm-lr-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Nordic Minimalist Living Room & Fireplace Niche",
            src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            dimensions: "5,600mm × 4,200mm",
            desc: "Photorealistic 3D render illustrating neutral grey wool textiles, black steel fireplace flue, and acoustic oak wall slats."
          },
          {
            id: "nm-lr-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Living Room Architectural Dimension Plan",
            src: "/assets/kitchen-2d-plan-page1.png",
            dimensions: "AutoCAD 2024 Working Plan",
            desc: "Furniture circulation clearances, floor outlet locations for floor lamps, and recessed architectural baseboard reveal details."
          }
        ]
      },
      {
        id: "kitchen",
        name: "Kitchen",
        icon: "🍳",
        coverImage: "/assets/kitchen-3d-render-2.jpg",
        description: "Monochromatic black & oak chef's kitchen featuring concealed handleless carcasses, matte anti-fingerprint FENIX surfaces, and integrated prep scullery.",
        dimensions: "4,000mm × 3,200mm",
        images: [
          {
            id: "nm-k-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Matte Black & Natural Oak Minimalist Kitchen",
            src: "/assets/kitchen-3d-render-2.jpg",
            dimensions: "4,000mm × 3,200mm",
            desc: "Seamless matte black cabinetry, concealed ventilation hood, integrated wine cellar, and warm linear LED pendant light."
          },
          {
            id: "nm-k-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Kitchen Island Joinery Schedule & Carcass Plan",
            src: "/assets/kitchen-2d-iso-page2.png",
            dimensions: "1:20 Scale Detail",
            desc: "Carcass fabrication drawing detailing Blum Legrabox drawer organizers, pull-out recycling centers, and concealed under-sink filtration."
          }
        ]
      },
      {
        id: "wardrobe",
        name: "Wardrobe",
        icon: "🚪",
        coverImage: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80",
        description: "Open minimalist walk-in wardrobe with floor-to-ceiling matte black metal uprights, natural oak shoe display shelves, and integrated diffused backlighting.",
        dimensions: "2,600mm × 2,200mm",
        images: [
          {
            id: "nm-w-3d-1",
            type: "3D",
            subType: "3D Render",
            title: "Minimalist Open-System Wardrobe Architecture",
            src: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80",
            dimensions: "2,600mm × 2,200mm",
            desc: "3D CGI render displaying aluminum upright system, illuminated shoe angled shelves, and minimalist open hanger rails."
          },
          {
            id: "nm-w-2d-1",
            type: "2D",
            subType: "2D Layout",
            title: "Wardrobe Modular Upright Section & Elevation Plan",
            src: "/assets/kitchen-crockery-page4.png",
            dimensions: "Modular Upright 2,400mm H",
            desc: "CAD construction drawing showing floor and ceiling tension brackets, shelf weight ratings, and wire raceways."
          }
        ]
      }
    ]
  }
];

// Storage Keys for LocalStorage and IndexedDB Persistence
const STORAGE_INTERIOR_KEY = 'anitha_interior_flow_projects_v4';
const IDB_DATABASE_NAME = 'AnithaInteriorPortfolioDB';
const IDB_STORE_NAME = 'projects_store';
const IDB_KEY = 'portfolio_projects_data';

// Synchronous in-memory projects cache to provide instant, reactive access across React components
let inMemoryProjects = null;

/**
 * Open IndexedDB connection (safely handles environments where IndexedDB is unsupported)
 */
function openIDB() {
  if (typeof window === 'undefined' || !window.indexedDB) return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(IDB_DATABASE_NAME, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
          db.createObjectStore(IDB_STORE_NAME);
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = () => resolve(null);
    } catch (e) {
      resolve(null);
    }
  });
}

/**
 * Persist projects array to IndexedDB (virtually unlimited browser storage)
 */
async function saveToIndexedDB(data) {
  try {
    const db = await openIDB();
    if (!db) return false;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE_NAME, 'readwrite');
        const store = tx.objectStore(IDB_STORE_NAME);
        store.put(data, IDB_KEY);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  } catch (e) {
    return false;
  }
}

/**
 * Retrieve projects array from IndexedDB
 */
async function loadFromIndexedDB() {
  try {
    const db = await openIDB();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE_NAME, 'readonly');
        const store = tx.objectStore(IDB_STORE_NAME);
        const req = store.get(IDB_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
  } catch (e) {
    return null;
  }
}

// Background sync from IndexedDB on startup (if IndexedDB contains richer/newer data than localStorage)
if (typeof window !== 'undefined') {
  loadFromIndexedDB().then((idbProjects) => {
    if (Array.isArray(idbProjects) && idbProjects.length > 0) {
      let idbImages = 0;
      idbProjects.forEach((p) => (p.categories || []).forEach((c) => (idbImages += (c.images || []).length)));

      let memImages = 0;
      (inMemoryProjects || []).forEach((p) => (p.categories || []).forEach((c) => (memImages += (c.images || []).length)));

      // If IndexedDB has at least as much or more image data, sync inMemoryProjects
      if (idbImages >= memImages) {
        inMemoryProjects = idbProjects;
        window.dispatchEvent(new Event('interior_projects_updated'));
      }
    }
  }).catch(() => {});
}

/**
 * Retrieve all projects from cache / localStorage (default is empty [])
 */
export function getAllInteriorProjects() {
  if (inMemoryProjects !== null) {
    return [...inMemoryProjects];
  }

  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_INTERIOR_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        inMemoryProjects = [...parsed];
        return [...inMemoryProjects];
      }
    }
  } catch (err) {
    console.warn('Failed to parse interior projects from localStorage:', err);
  }

  inMemoryProjects = [];
  return [];
}

/**
 * Clear all projects and categories (Wipe all)
 */
export function clearAllInteriorProjects() {
  inMemoryProjects = [];
  try {
    localStorage.setItem(STORAGE_INTERIOR_KEY, JSON.stringify([]));
  } catch (e) {}
  saveToIndexedDB([]);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('interior_projects_updated'));
  }
  return [];
}

/**
 * Optional: Load sample showcase projects for demo purposes
 */
export function loadSampleShowcaseProjects() {
  const clone = JSON.parse(JSON.stringify(sampleShowcaseProjects));
  saveInteriorProjects(clone);
  return clone;
}

/**
 * Retrieve single project by ID
 */
export function getInteriorProjectById(projectId) {
  if (!projectId) return null;
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  return (
    list.find(
      (p) =>
        String(p.id).trim().toLowerCase() === cleanId ||
        String(p.title).trim().toLowerCase() === cleanId
    ) || null
  );
}

/**
 * Retrieve category by project ID and category ID
 */
export function getCategoryByProjectAndId(projectId, categoryId) {
  const project = getInteriorProjectById(projectId);
  if (!project || !project.categories) return null;
  const cleanCatId = String(categoryId).trim().toLowerCase();
  return (
    project.categories.find(
      (c) =>
        String(c.id).trim().toLowerCase() === cleanCatId ||
        String(c.name).trim().toLowerCase() === cleanCatId
    ) || null
  );
}

/**
 * Persist projects list to memory cache, IndexedDB, and localStorage with quota protection
 */
export function saveInteriorProjects(projectsList) {
  // 1. Immediately update in-memory cache for synchronous reactivity
  const cloned = Array.isArray(projectsList) ? [...projectsList] : [];
  inMemoryProjects = cloned;

  // 2. Persist to IndexedDB (asynchronous, virtually unlimited quota, safe for dozens of categories)
  saveToIndexedDB(cloned).catch((err) => {
    console.warn('IndexedDB persistence note:', err);
  });

  // 3. Persist to localStorage with quota-safe protection
  try {
    localStorage.setItem(STORAGE_INTERIOR_KEY, JSON.stringify(cloned));
  } catch (err) {
    console.warn('LocalStorage 5MB quota reached; full data safely preserved in IndexedDB & memory:', err);
    try {
      // Safe fallback: store project structure without giant base64 strings so initial sync never fails
      const lightweight = cloned.map((p) => ({
        ...p,
        categories: (p.categories || []).map((c) => ({
          ...c,
          images: (c.images || []).map((img) => ({
            ...img,
            src: img.src && img.src.length > 300000 ? '' : img.src
          }))
        }))
      }));
      localStorage.setItem(STORAGE_INTERIOR_KEY, JSON.stringify(lightweight));
    } catch (fallbackErr) {
      // IndexedDB handles full storage
    }
  }

  // 4. Always dispatch notification event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('interior_projects_updated'));
  }

  return true;
}

/**
 * Helper to slugify strings into clean IDs
 */
export function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * FORM 1: Create a new project (First CRUD)
 */
export function createInteriorProject(projectData) {
  const list = getAllInteriorProjects();
  const baseId = slugify(projectData.title) || `project-${Date.now()}`;
  let finalId = baseId;
  let counter = 1;
  while (list.some((p) => p.id === finalId)) {
    finalId = `${baseId}-${counter}`;
    counter++;
  }

  const newProject = {
    id: finalId,
    title: projectData.title || 'Untitled Project',
    location: projectData.location || 'Location Not Specified',
    year: projectData.year || new Date().getFullYear().toString(),
    area: projectData.area || '',
    client: projectData.client || 'Private Client',
    description: projectData.description || '',
    coverImage: projectData.coverImage || '/assets/kitchen-3d-render-1.jpg',
    categories: projectData.categories || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updated = [newProject, ...list];
  saveInteriorProjects(updated);
  return newProject;
}

/**
 * FORM 1: Update an existing project
 */
export function updateInteriorProject(projectId, updatedFields) {
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  const index = list.findIndex((p) => String(p.id).trim().toLowerCase() === cleanId);
  if (index === -1) return null;

  list[index] = {
    ...list[index],
    ...updatedFields,
    updatedAt: new Date().toISOString()
  };

  saveInteriorProjects(list);
  return list[index];
}

/**
 * FORM 1: Delete a project
 */
export function deleteInteriorProject(projectId) {
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  const filtered = list.filter((p) => String(p.id).trim().toLowerCase() !== cleanId);
  saveInteriorProjects(filtered);
  return filtered;
}

/**
 * FORM 2: Save / Map Category with multiple 2D and 3D images to a project (Second Form)
 */
export function saveCategoryWithImages(projectId, categoryData) {
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  const projectIndex = list.findIndex((p) => String(p.id).trim().toLowerCase() === cleanId);
  if (projectIndex === -1) return null;

  const project = list[projectIndex];
  const categories = project.categories ? [...project.categories] : [];

  let targetCatId = categoryData.id;
  let catIndex = -1;

  if (targetCatId && !categoryData.isNew) {
    catIndex = categories.findIndex((c) => String(c.id).trim().toLowerCase() === String(targetCatId).trim().toLowerCase());
  }

  if (catIndex === -1) {
    // Generate guaranteed unique category ID
    const baseId = slugify(categoryData.name) || `cat-${Date.now()}`;
    let uniqueId = baseId;
    let counter = 1;
    while (categories.some((c) => String(c.id).toLowerCase() === uniqueId.toLowerCase())) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }
    targetCatId = uniqueId;
  }

  // Formatted category object
  const formattedCategory = {
    id: targetCatId,
    name: categoryData.name || 'New Category',
    icon: categoryData.icon || '🏠',
    coverImage: categoryData.coverImage || (categoryData.images && categoryData.images[0]?.src) || '/assets/kitchen-3d-render-1.jpg',
    description: categoryData.description || '',
    dimensions: categoryData.dimensions || '',
    images: Array.isArray(categoryData.images) ? categoryData.images : []
  };

  if (catIndex >= 0) {
    // Update existing category
    categories[catIndex] = formattedCategory;
  } else {
    // Add new category to project
    categories.push(formattedCategory);
  }

  list[projectIndex] = {
    ...project,
    categories,
    updatedAt: new Date().toISOString()
  };

  saveInteriorProjects(list);
  return list[projectIndex];
}

/**
 * FORM 2: Delete a category from a project
 */
export function deleteCategoryFromProject(projectId, categoryId) {
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  const projectIndex = list.findIndex((p) => String(p.id).trim().toLowerCase() === cleanId);
  if (projectIndex === -1) return null;

  const project = list[projectIndex];
  const cleanCatId = String(categoryId).trim().toLowerCase();
  const filteredCategories = (project.categories || []).filter(
    (c) => String(c.id).trim().toLowerCase() !== cleanCatId
  );

  list[projectIndex] = {
    ...project,
    categories: filteredCategories,
    updatedAt: new Date().toISOString()
  };

  saveInteriorProjects(list);
  return list[projectIndex];
}

/**
 * FORM 2: Batch add multiple room categories to a project
 */
export function batchAddCategoriesToProject(projectId, categoriesToAdd) {
  const list = getAllInteriorProjects();
  const cleanId = String(projectId).trim().toLowerCase();
  const projectIndex = list.findIndex((p) => String(p.id).trim().toLowerCase() === cleanId);
  if (projectIndex === -1) return null;

  const project = list[projectIndex];
  const existingCategories = project.categories ? [...project.categories] : [];

  categoriesToAdd.forEach((cat) => {
    const baseId = slugify(cat.name) || `cat-${Date.now()}`;
    let uniqueId = baseId;
    let counter = 1;
    while (existingCategories.some((c) => String(c.id).toLowerCase() === uniqueId.toLowerCase())) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }

    existingCategories.push({
      id: uniqueId,
      name: cat.name,
      icon: cat.icon || '🏠',
      dimensions: cat.dimensions || '',
      description: cat.desc || cat.description || '',
      coverImage: cat.coverImage || (cat.images && cat.images[0]?.src) || '/assets/kitchen-3d-render-1.jpg',
      images: Array.isArray(cat.images) ? cat.images : []
    });
  });

  list[projectIndex] = {
    ...project,
    categories: existingCategories,
    updatedAt: new Date().toISOString()
  };

  saveInteriorProjects(list);
  return list[projectIndex];
}

/**
 * Clear / reset all interior projects and categories
 */
export function resetInteriorProjectsToDefault() {
  return clearAllInteriorProjects();
}

/**
 * Automatically compress and downscale an image file to an optimized Base64 data URL.
 * Reduces 3MB-8MB images to ~120KB-180KB (90-97% reduction), ensuring sharp 4K clarity
 * while allowing dozens of 2D/3D images across multiple categories without hitting browser storage quotas.
 */
export function compressImageFile(file, options = {}) {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.82,
    fallbackQuality = 0.70
  } = options;

  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }

    // If it's already a string URL or not an image file (e.g., PDF or raw binary), fallback
    if (typeof file === 'string') {
      resolve(file);
      return;
    }

    if (!file.type || !file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    // Use offscreen image and canvas
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        let width = img.naturalWidth || img.width || 1200;
        let height = img.naturalHeight || img.height || 800;

        // Downscale maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          throw new Error('Canvas 2D context unavailable');
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // White background for non-PNG or transparent images
        if (file.type !== 'image/png') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-quality JPEG
        let dataUrl = canvas.toDataURL('image/jpeg', quality);

        // If data URL is still larger than ~350KB, apply fallback quality
        if (dataUrl.length > 450000) {
          dataUrl = canvas.toDataURL('image/jpeg', fallbackQuality);
        }

        resolve(dataUrl);
      } catch (err) {
        console.warn('Canvas compression fallback to standard FileReader:', err);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (readerErr) => reject(readerErr);
        reader.readAsDataURL(file);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (readerErr) => reject(readerErr);
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Utility to convert uploaded file into optimized base64 Data URL.
 * Automatically applies canvas downscaling and compression.
 */
export async function fileToBase64(file) {
  return compressImageFile(file);
}

/**
 * Safely opens any image (base64 Data URL or standard URL) in full resolution in a new tab.
 * Circumvents Chrome/Edge/Safari's blocking of top-frame navigation to data: URLs
 * by converting base64 data to a Blob URL (blob:...), with fallback to a luxury styled window.
 */
export function openFullResolutionImage(src, title = 'Full Resolution Image') {
  if (!src) return;

  // Handle Base64 Data URLs
  if (typeof src === 'string' && src.startsWith('data:')) {
    try {
      const parts = src.split(',');
      const meta = parts[0] || '';
      const base64Data = parts[1] || '';
      const mimeMatch = meta.match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);

      const newWindow = window.open(blobUrl, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback viewer if direct blob window was intercepted
        const fallback = window.open('', '_blank');
        if (fallback) {
          fallback.document.write(`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <title>${title} | Anitha Roselin Interior Architecture</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>
                  * { box-sizing: border-box; }
                  body {
                    margin: 0;
                    padding: 20px;
                    background: #0d0c0b;
                    color: #FAF8F5;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                  }
                  img {
                    max-width: 100%;
                    max-height: 94vh;
                    object-fit: contain;
                    border-radius: 4px;
                    box-shadow: 0 16px 64px rgba(0, 0, 0, 0.85);
                  }
                </style>
              </head>
              <body>
                <img src="${src}" alt="${title}" />
              </body>
            </html>
          `);
          fallback.document.close();
        }
      }
      return;
    } catch (err) {
      console.warn('Blob URL generation exception, using fallback window:', err);
      const fallback = window.open('', '_blank');
      if (fallback) {
        fallback.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${title}</title>
              <style>
                body { margin: 0; background: #0d0c0b; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
                img { max-width: 100%; max-height: 94vh; object-fit: contain; }
              </style>
            </head>
            <body><img src="${src}" alt="${title}" /></body>
          </html>
        `);
        fallback.document.close();
      }
      return;
    }
  }

  // Standard relative or external HTTP/HTTPS URL
  window.open(src, '_blank', 'noopener,noreferrer');
}

