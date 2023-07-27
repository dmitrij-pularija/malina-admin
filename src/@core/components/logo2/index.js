import { logoSize } from '../../../configs/initial'

const Logo2 = ({ src, size }) => {
  
  return (
      <div className="logo">
        <img
          className="fallback-logo"
          src={src}
          width={logoSize[size].width}
          height={logoSize[size].height}
          alt="logo"
        />
      </div>
  )
}

export default Logo2
