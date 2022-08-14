// import logo from './astro.svg'
import logo from './astro.svg?raw'

export const Reactive = () => {
    // return <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, et voluptates exercitationem id quisquam non magnam ullam corrupti ad incidunt, in porro consequatur doloremque optio quod necessitatibus aliquid, laudantium aut.</div>
    return (
        // <div dangerouslySetInnerHTML={{ __html: logo }}>
            <img src={logo} alt="image description" />
        // </div>
    )
}