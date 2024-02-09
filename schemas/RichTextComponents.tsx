import React from 'react'

const H1 = (props: { children: React.ReactElement }) => {
  return <span style={{ fontSize: '1.75em', fontWeight: 600 }}>{props.children}</span>
}

const H2 = (props: { children: React.ReactElement }) => {
  return <span style={{ fontSize: '1.3em', fontWeight: 600 }}>{props.children}</span>
}

export { H1, H2 }
