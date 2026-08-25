// import { Instagram, Twitter, Youtube } from "lucide-react";

export function FooterCopy() {
  const cols = [
    {
      heading: "Shop",
      links: ["New Arrivals", "Shoes", "Clothing", "Accessories", "Sale"],
    },
    {
      heading: "Help",
      links: ["Sizing Guide", "Shipping & Returns", "Track Order", "FAQ", "Contact"],
    },
    {
      heading: "Company",
      links: ["About Us", "Sustainability", "Careers", "Press", "Affiliates"],
    },
  ];

  return (
    <div style={{
        marginTop:"3rem",
        backgroundColor:'black',
        width:'100vw'
    }}>
    <footer style={{
        padding:'3rem'
    }} className="bg-[#0D0D0D] text-white/50">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12" >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-['Playfair_Display'] text-white text-xl tracking-widest uppercase mb-4">
              AJAY SHOP & STITCH
            </p>
            <p className="text-xs leading-relaxed max-w-xs">
              Curated footwear and fashion for those who move through the world with intention.
            </p>
            {/* <div className="flex items-center gap-4 mt-6">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="text-white/30 hover:text-[#C8A96E] transition-colors"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div> */}
          </div>

          {/* Links */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="text-white text-xs tracking-[0.2em] uppercase mb-5">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <button className="text-xs hover:text-[#C8A96E] transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{
            marginTop:"3rem"
        }}>
          <p className="text-[11px] tracking-wider">
            © 2026 Sole & Stitch. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <button key={item} className="text-[11px] hover:text-[#C8A96E] transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}

