import { useEffect, useState } from "react"

const width = 8

const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])


  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const ColumnOfFour = [i, i + width,i +width *2, i + width * 3]
      const decidedColor = currentColorArrangement[i]
      if (ColumnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        ColumnOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfFour = [i, i + 1, i+ 2, i + 3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 52,  63, 64]
      if (notValid.includes(i)) continue

      if (RowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        RowOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const ColumnOfThree = [i, i + width,i +width *2]
      const decidedColor = currentColorArrangement[i]
      if (ColumnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        ColumnOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const RowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      if (notValid.includes(i)) continue

      if (RowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        RowOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const createBoard = ()=>{
    const randomColorArrangement = []

    for (let i = 0; i< width * width; i++){

      const ranNum = Math.floor(Math.random() * candyColors.length)

      const randomColor = candyColors[ranNum]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }
  

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(()=>{
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()

      setCurrentColorArrangement([ ...currentColorArrangement])
    },100)
    return () => clearInterval(timer)
  }, [checkForColumnOfFour, checkForRowOfFour ,checkForColumnOfThree, checkForRowOfThree, currentColorArrangement])
  

  console.log(currentColorArrangement);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) =>(
          <img
            key={index}
            style={{backgroundColor: candyColor}}
            alt={candyColor}
          />
        ))}
     </div>
    </div>
  );
}

export default App;
 