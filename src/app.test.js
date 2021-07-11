import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from './App'

test('side bar should be mounted', () => {
  const {queryByTitle}= render(<App/>)
  const sideBarElement = queryByTitle("sidebar")
    expect(sideBarElement).toBeInTheDocument()
  })

