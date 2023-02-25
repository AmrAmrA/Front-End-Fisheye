class photographerFactory {
  constructor(data, type) {
    //  Show me all the photographers
      if (type === 'allPhotographers') {
          return new allPhotographers(data)
          //  show me one photographer
      } 
      
      if (type === 'onePhotographer') {
          return new onePhotographer(data)
      } 
    //   Launch an error if the type is not correct
      
      throw 'Unknown type format'
     
  }
}
