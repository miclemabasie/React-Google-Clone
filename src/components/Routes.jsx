import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Results from './Results'

const Router = () => {
  return (
    <div className="p-4">
      <Routes >
        <Route exact path="/" element={<Navigate replace to="/search" />} />
        {/* <Route exact path={['/search', '/images', '/news', '/videos']} element={<Results />} /> */}
        {['/search', '/images', '/news', '/videos'].map(path => (
          <Route 
            key="Home" // optional: avoid full re-renders on route changes
            path={path}
            element={<Results />}
          />
        ))}
      </Routes>
    </div>
  )
}

export default Router