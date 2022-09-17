import React from 'react'
import Icon, {SmileOutlined} from '@ant-design/icons'

function Footer() {
  return (
    <div style={{
      height: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fotSize: '1rem'
    }}>
      <p>Hello <SmileOutlined /></p>
    </div>
    
  )
}

export default Footer