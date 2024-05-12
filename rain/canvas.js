export const canvas = document.querySelector('#rainCanvas')
canvas.width = window.innerWidth || window.outerWidth
canvas.height = window.innerHeight || window.outerHeight

export const ctx = canvas.getContext('2d')