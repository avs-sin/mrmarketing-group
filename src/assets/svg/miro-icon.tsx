// React Imports
import type { SVGProps } from 'react'

const MiroIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M0 5.96744C0 2.67442 2.65733 0 5.93044 0H17.7932C21.0672 0 23.7245 2.67349 23.7245 5.96744V17.9014C23.7245 21.1953 21.0672 23.8688 17.7932 23.8688H5.93044C2.65733 23.8698 0 21.1953 0 17.9023V5.96744Z'
        fill='#FFDD33'
      />
      <path
        fillRule='evenodd'
        clipPath='evenodd'
        d='M15.7705 4.55347H13.6189L15.4145 7.72556L11.4664 4.55347H9.31485L11.2889 8.42789L7.16328 4.55347H5.01172L7.16328 9.48928L5.01172 19.36H7.16328L11.2889 8.78696L9.31485 19.36H11.4664L15.4145 8.07905L13.6189 19.36H15.7705L19.7185 7.02323L15.7705 4.55812V4.55347Z'
        fill='#1C1C1E'
      />
    </svg>
  )
}

export default MiroIcon
