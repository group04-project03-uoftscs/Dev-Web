import React, { useRef, useEffect } from "react";
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import {checkLocalStorageLanding} from '../functions/functions'
import axios from 'axios';
import { useStoreContext } from "../utils/GlobalState";

function Landing() {
    const parallax = useRef()
    const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
      checkLocalStorageLanding(axios, dispatch);
    }, [])

    return (
      <Parallax pages={3} >
        <div className="bg-indigo-500 z-50">
          <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#6500B0' }} />
          <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

          <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />

          <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
            <img src={url('satellite3')} style={{ width: '15%', marginLeft: '80%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
            <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
          </ParallaxLayer>

          <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <img src={url('earth')} style={{ width: '60%' }} />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0.3}>
            <a href="/login"><img className="w-80 absolute bottom-24 left-24 transform hover:scale-110 motion-reduce:transform-none" src="https://i.postimg.cc/Pf7zNXXG/Screenshot-2021-03-20-221149.png"></img></a>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0.3}>
            <img className="w-80 absolute bottom-24 right-24" src="https://i.postimg.cc/65gXHvBH/Screenshot-2021-03-20-221925.png"></img>
          </ParallaxLayer>

          <ParallaxLayer
            offset={0}
            speed={0.1}
            className="flex items-center justify-center bg-gradient-to-br from-yellow-300 via-indigo-500 to-blue-800">
            <img className="w-5/12" src="https://i.postimg.cc/fWdKWTTV/Dev-Web.gif"></img>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.1}
            className="flex items-center justify-center">
            <img className="w-4/12" src="https://i.postimg.cc/LsrPSMrt/Congrats-on-your-promotion-1.gif"></img>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0}
            className="flex items-center justify-center">
            <img className="w-80" src="https://i.postimg.cc/bNjrmWLD/Screenshot-2021-03-20-220804.png"></img>
          </ParallaxLayer>
        </div>
      </Parallax>
    )
  
}

export default Landing;
