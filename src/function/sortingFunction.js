export function ascending( a, b ) {
    if ( a.name.common < b.name.common ){
      return -1;
    }
    if ( a.name.common > b.name.common ){
      return 1;
    }
    return 0;
  }

  export function descending( a, b ) {
    if ( a.name.common > b.name.common ){
      return -1;
    }
    if ( a.name.common < b.name.common ){
      return 1;
    }
    return 0;
  }

  export function areaDescending( a, b ) {
    if ( a.area < b.area ){
      return -1;
    }
    if ( a.area > b.area ){
      return 1;
    }
    return 0;
  }