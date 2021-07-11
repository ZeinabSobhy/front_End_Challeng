import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from './App'

test('side bar should be mounted', () => {
  const {queryByTitle}= render(<App/>)
  const sideBarElement = queryByTitle("sidebar")
    expect(sideBarElement).toBeInTheDocument()
  })
  test('when click clear text box should be empty', () => {
    const {queryAllByRole}= render(<App/>)
    const textBox = queryAllByRole('textbox')[0]
    const clrBtn = queryAllByRole('button')[0]
      textBox.nodeValue = "Product";
      fireEvent.click(clrBtn)
      expect(textBox.nodeValue).toBe(null)
    })
  
  
    test('when click clear text box should be empty', () => {
      const {queryAllByRole}= render(<App/>)
      const textBox = queryAllByRole('textbox')[1]
      const clrBtn = queryAllByRole('button')[1]
        textBox.nodeValue = "Cost";
        fireEvent.click(clrBtn)
        expect(textBox.nodeValue).toBe(null)
      })

