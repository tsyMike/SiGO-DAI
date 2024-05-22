import React from 'react'

function ExpandableRowsComponent({data}) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default ExpandableRowsComponent