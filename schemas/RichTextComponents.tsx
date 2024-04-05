import React from 'react'
// https://www.sanity.io/docs/customizing-the-portable-text-editor#14d3f8b767ae

export const MainHeading = (props: { children: React.ReactElement }) => {
  return <span style={{ fontSize: '1.75em', fontWeight: 600 }}>{props.children}</span>
}

export const SubHeading = (props: { children: React.ReactElement }) => {
  return <span style={{ fontSize: '1.3em', fontWeight: 600 }}>{props.children}</span>
}

export const Gist = (props: { children: React.ReactElement }) => {
  return <span style={{ fontSize: '1.3em', fontWeight: 600 }}>{props.children}</span>
}
