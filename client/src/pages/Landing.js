import React, { useRef } from "react";
import { useSpring, animated } from 'react-spring'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

export default class Landing extends React.Component {
  render() {

    return (
      <Parallax ref={ref => (this.parallax = ref)} pages={3} >
        <div className="bg-cover z-50">
          <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#6500B0' }} />
          <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

          <ParallaxLayer offset={0} speed={0}>
            <img className="cover hidden md:block md:w-full md:h-full opacity-20" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={1}>
            <img className="cover hidden md:block md:w-full md:h-full opacity-20" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
          </ParallaxLayer>
          <ParallaxLayer offset={2} speed={1}>
            <img className="cover hidden md:block md:w-full md:h-full opacity-20" src="https://i.postimg.cc/1XydR6bn/bg-2.png"></img>
          </ParallaxLayer>

          <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
            <svg style={{ width: '15%', marginLeft: '80%' }} fill="none" stroke="indigo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.2 }}>
            <svg style={{ display: 'block', width: '20%', marginLeft: '55%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <svg style={{ display: 'block', width: '10%', marginLeft: '30%' }} fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <svg style={{ display: 'block', width: '10%', marginLeft: '15%' }} fill="none" stroke="blue" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.3 }}>
            <svg class="w-24 h-24 absolute right-4" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <svg class="w-48 h-48 absolute top-10 left-32" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          </ParallaxLayer>

          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.1 }}>
            <svg class="w-32 h-32 absolute top-2 right-24" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <svg class="w-24 h-24 absolute top-24 left-48" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0.4} style={{ opacity: 0.6 }}>
            <svg class="w-32 h-32 absolute top-2 right-24" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <svg class="w-24 h-24 absolute top-20 right-56" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <svg class="w-48 h-48 absolute top-2 left-2" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <svg class="w-32 h-32 absolute top-10 left-72" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          </ParallaxLayer>

          <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <svg class="w-56 h-56 absolute top-2 left-2" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <svg class="w-48 h-48 absolute top-10 right-56" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          </ParallaxLayer>

          <ParallaxLayer offset={2.5} speed={-0.4} className="flex items-center justify-center">
            <img className="flex items-center justify-center" src="https://i.postimg.cc/7ZGkf5xs/earth.png"></img>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0.3}>
            <a href="/login"><img className="w-80 rounded-2xl hidden md:inline-flex absolute bottom-24 left-24 transform hover:scale-110 motion-reduce:transform-none" src="https://i.postimg.cc/dVGC5wPt/podcast.png"></img></a>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0.3}>
            <img className="w-80 hidden rounded-2xl md:inline-flex absolute bottom-24 right-24" src="https://i.postimg.cc/0j56XsCh/jobs.png"></img>
          </ParallaxLayer>

          <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => this.parallax.scrollTo(1)}
            className="flex items-center justify-center bg-opacity-25">
            <img className="w-5/12" src="https://i.postimg.cc/fWdKWTTV/Dev-Web.gif"></img>
            <img className="w-12 absolute bottom-12 animate-bounce" src="https://i.postimg.cc/8CGFSRZz/icons8-page-down-button-96.png"></img>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.1}
            onClick={() => this.parallax.scrollTo(2)}
            className="flex items-center justify-center">
            <img className="w-4/12" src="https://i.postimg.cc/LsrPSMrt/Congrats-on-your-promotion-1.gif"></img>
            <img className="w-12 absolute bottom-12 animate-bounce" src="https://i.postimg.cc/8CGFSRZz/icons8-page-down-button-96.png"></img>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0}
            className="flex items-center justify-center"
            onClick={() => this.parallax.scrollTo(0)}>
            <img className="w-80 rounded-2xl" src="https://i.postimg.cc/3whjgWqZ/news.png"></img>
            <img className="w-12 absolute bottom-12 animate-bounce" src="https://i.postimg.cc/hGGXvDRk/icons8-page-up-button-96.png"></img>
          </ParallaxLayer>
        </div>
      </Parallax>
    )
  }
}