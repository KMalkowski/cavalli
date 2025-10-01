'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function Horses() {
  const horses = useQuery(api.horses.list, {
    paginationOpts: {
      numItems: 12,
      cursor: null,
    },
  })

  if (horses === undefined) {
    return <div>Loading...</div>
  }

  if (!horses.page.length) {
    return <div>No horses found.</div>
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {horses.page.map((horse) => (
        <div
          key={horse._id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            background: '#fafafa',
          }}
        >
          <img src={horse.imageUrl || undefined} alt={horse.name} />
          <h3 style={{ margin: '0 0 0.5rem 0' }}>{horse.name}</h3>
          <div>Breed: {horse.breed}</div>
          <div>
            Price: {horse.price} {horse.currency}
          </div>
          <div>Height: {horse.height ? `${horse.height} cm` : 'N/A'}</div>
        </div>
      ))}
    </div>
  )
}
