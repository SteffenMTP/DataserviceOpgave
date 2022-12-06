import Title from "../components/Title";
// import {gsap} from 'gsap'

const Home = () => {

    // const glass = document.getElementById('glass');

    //     const tl = gsap.timeline({defaults: {ease: "power2.inOut", duration: 1.5}})

    //     tl.from('img', {x: '-10%', opacity: 0})
    //     .from('.container', {opacity: 0, delay: .5, duration: 1}, "-=1.5")
    //     .from('.container', {x:'-20%', backdropFilter: 'blur(0px)'})
    //     .from('.seq', {y: -30, opacity: 0, stagger: .2, duration: .5}, "-=.5")
    //     .from('h1', {y: 20, clipPath: 'inset(0 0 100% 0'}, "-=.8")


    return (
        <>

            <section className="container">
                <Title headline="Home" />

                {/* <img src="./assets/img/abstract.jpg" alt="abstract background corridor" class="glassImg"/>
                    <div class="circle"></div>

                    <div class="Glasscontainer" id="glass">
                        <h2 class="seq">Hello everyone</h2>
                        <p class="seq">Let's go ahead and get this show on the road</p>
                    </div>

                    <h1>Glassmorphism Realized</h1> */}

            </section>

        </>
    )



}

export default Home;