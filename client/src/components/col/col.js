import * as React from 'react';

export class Col extends React.Component<{sm?:number,md?:number, lg?:number, xl?:number}>{

  getClassText(){
    let classText = "";
    if(this.props.sm){
      classText += "col col-sm-" + this.props.sm
    } else if(this.props.md){
      classText += "col col-md-" + this.props.md
    }else if(this.props.lg){
      classText += "col col-lg-" + this.props.lg
    }else{
      classText += "col col-xl-" + this.props.xl
    }
    return classText;
  }

  render() {
    return (
      <div className={this.getClassText()}>
        {this.props.children}
      </div>
    );
  }
}
