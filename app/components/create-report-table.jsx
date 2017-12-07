import React, { Component } from 'react';
import Dragula from 'react-dragula';

export default class CreateReportTable extends Component {
  props: {
    columns: [],
    ordered: [],
    removeColumn: column => [],
    setErrorClass: column => string,
    reorderColumns: columns => void
  };

  dragulaDecorator = componentBackingInstance => {
    if (componentBackingInstance) {
      let options = {
        direction: 'horizontal'
      };
      const dragula = Dragula([componentBackingInstance], options);

      dragula.on('drop', (el, target, source, sibling) => {
        const initialIndex = this.getIndexOfColumn(el.children[0].value);
        const newIndex = sibling
          ? this.getIndexOfColumn(sibling.children[0].value)
          : this.props.columns.length - 1;

        this.alterColumns(initialIndex, newIndex);
      });
    }
  };

  getColumns() {
    return this.props.ordered.length > 0
      ? this.props.ordered
      : this.props.columns;
  }

  getIndexOfColumn(id) {
    let index = -1;
    this.getColumns().forEach((col, i) => {
      if (col.id !== id) return;
      index = i;
    });
    return index;
  }

  reorderColumns(oldIndex, newIndex) {
    let updated = [];
    const columns = this.getColumns();

    // where we insert the old column that used to be at new index
    let updatedIndex = newIndex;

    // where we insert the column we are moving
    let newLocation = newIndex;

    // if there is more than three columns, then sibling in dragula on drop
    // actually is one index off to the right so we need to subtract it.
    // this is only the case if we are moving something up the list
    if (columns.length > 3 && newIndex > oldIndex) {
      updatedIndex = newIndex - 1;
    }

    // if we are moving something up the list but not all the way to the end
    // then we need to set the new location for what column used to exist there to
    // be the correct sibling index. if it is at the end then the sibling error
    // in dragula doesnt affect us.

    if (newIndex > oldIndex && newIndex !== columns.length - 1) {
      newLocation = updatedIndex;
    }

    // remove both items at the old and new indexes.
    updated = columns.filter((col, i) => i !== oldIndex && i !== newIndex);

    // insert the column that used to exist at its new location
    updated.splice(updatedIndex, 0, columns[newIndex]);

    // insert the column we want to move to its new location
    updated.splice(newLocation, 0, columns[oldIndex]);

    return updated;
  }

  alterColumns(oldIndex, newIndex) {
    const columns = this.reorderColumns(oldIndex, newIndex);
    this.props.reorderColumns(columns);
  }

  render() {
    return (
      <div className="col-md-12" style={{ overflowX: 'auto', width: '100%' }}>
        <div style={{ width: '300%' }} ref={this.dragulaDecorator}>
          {this.props.columns.map(column => (
            <div style={{ float: 'left' }}>
              <input type="hidden" value={column.id} />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>
                      {column.name}
                      <i
                        style={{ marginLeft: '5px' }}
                        onClick={() => this.props.removeColumn(column)}
                        className="pull-right glyphicon glyphicon-remove clean-btn"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{column.value}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
