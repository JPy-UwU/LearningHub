"use client";

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative bg-gradient-to-r from-teal-400 via-teal-500 to-purple-500 h-20 flex justify-between items-center px-8">
      {/* Gradient Effect with SVGs */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/4 left-1/2 transform -translate-x-1/2">
          {<svg width="1440" height="629" viewBox="0 0 1440 629" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.3" filter="url(#filter0_f_206_231)">
              <ellipse cx="736" cy="-24" rx="736" ry="303" fill="#00FAFA" />
              <path d="M1471.5 -24C1471.5 17.6592 1450.99 57.3932 1413.81 93.583C1376.63 129.774 1322.8 162.39 1256.24 189.791C1123.12 244.593 939.192 278.5 736 278.5C532.808 278.5 348.876 244.593 215.76 189.791C149.201 162.39 95.3702 129.774 58.1873 93.583C21.006 57.3932 0.5 17.6592 0.5 -24C0.5 -65.6592 21.006 -105.393 58.1873 -141.583C95.3702 -177.774 149.201 -210.39 215.76 -237.791C348.876 -292.593 532.808 -326.5 736 -326.5C939.192 -326.5 1123.12 -292.593 1256.24 -237.791C1322.8 -210.39 1376.63 -177.774 1413.81 -141.583C1450.99 -105.393 1471.5 -65.6592 1471.5 -24Z" stroke="black" />
            </g>
            <defs>
              <filter id="filter0_f_206_231" x="-350" y="-677" width="2172" height="1306" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="175" result="effect1_foregroundBlur_206_231" />
              </filter>
            </defs>
          </svg>
          }
        </div>
        <div className="absolute -top-1/4 right-0">
          {<svg width="609" height="1787" viewBox="0 0 609 1787" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.3" filter="url(#filter0_f_206_230)">
              <ellipse cx="629" cy="701" rx="325" ry="782" fill="#862DBC" />
              <path d="M953.5 701C953.5 916.894 917.13 1112.33 858.348 1253.77C828.956 1324.49 793.971 1381.69 755.148 1421.2C716.327 1460.71 673.698 1482.5 629 1482.5C584.302 1482.5 541.673 1460.71 502.852 1421.2C464.029 1381.69 429.044 1324.49 399.652 1253.77C340.869 1112.33 304.5 916.894 304.5 701C304.5 485.106 340.869 289.674 399.652 148.234C429.044 77.5134 464.029 20.3147 502.852 -19.1961C541.673 -58.7052 584.302 -80.5 629 -80.5C673.698 -80.5 716.327 -58.7052 755.148 -19.1961C793.971 20.3147 828.956 77.5134 858.348 148.234C917.13 289.674 953.5 485.106 953.5 701Z" stroke="black" />
            </g>
            <defs>
              <filter id="filter0_f_206_230" x="0" y="-385" width="1258" height="2172" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="152" result="effect1_foregroundBlur_206_230" />
              </filter>
            </defs>
          </svg>
          }
        </div>
      </div>
      {/* Logo */}
      <h1 className="text-black font-bold text-xl">LEARNING HUB</h1>
      {/* Navigation Links */}
      <div className="space-x-4 z-[20]">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button>
            Sign Up
          </Button>
        </Link>
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button>
            Sign In
          </Button>
        </Link>

      </div>
    </div>
  );
};

export default NavBar;