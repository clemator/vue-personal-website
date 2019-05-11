import { CELL } from './../../../utils/constants/index';

const state = {
  height: 10,
  width: 10,
  gridMatrix: []
};

const getters = {
  touchedMatrixCells: state => {
    return state.gridMatrix;
  },
  isUntouched: state => {
    return !state.gridMatrix.some(array => {
      return array.some(cell => cell.status !== CELL.STATUS.DEFAULT);
    });
  },
  getCell: state => ({ X, Y }) => state.gridMatrix[Y][X]
};

const actions = {
  /**
   * Initialize the grid with given properties
   * @param {Object} param0 
   * @param {Object} gridOptions the options
   * @param {Number} gridOptions.height grid total height
   * @param {Number} gridOptions.width grid total width
   * @param {String} gridOptions.defaultCellStatus the cells default status
   * @param {String} gridOptions.defaultCellColor the cells default color
   * @param {String} gridOptions.defaultCellModule the cells default module
   */
  initializeGrid({ commit }, gridOptions) {
    const {
      height,
      width,
      defaultCellStatus,
      defaultCellColor,
      defaultCellModule,
      patternHeight,
      patternWidth
    } = gridOptions;
    let matrix = [];
    let matrixArray = [];
    const matrixArrayCell = {
      status: defaultCellStatus,
      color: defaultCellColor,
      module: defaultCellModule
    };
    const gridSize = {
      height: Math.floor(height / patternHeight),
      width: Math.floor(width / patternWidth)
    }

    commit('setGridSize', gridSize);

    for (let i = 0; i < gridSize.height; i++) {
      matrixArray = [];
      for (let j = 0; j < gridSize.width; j++) {
        matrixArray.push({...matrixArrayCell, X: j, Y: i});
      }
      matrix.push(matrixArray);
    }

    commit('setGridContent', matrix);
  },
  changeCellStatus({ commit }, cell) {
    commit('setCellStatus', cell);
  },
  changeCellColor({ commit }, cell) {
    commit('setCellColor', cell);
  },
  resetGrid({ commit }) {
    commit('setGridContent', []);
    commit('setGridSize', {});
  }
};

const mutations = {
  setGridSize(state, { height, width }) {
    state.height = height;
    state.width = width;
  },
  setGridContent(state, matrix) {
    state.gridMatrix = matrix;
  },
  setCellStatus(state, { status, X, Y }) {
    state.gridMatrix[Y][X].status = status;
  },
  setCellColor(state, { color, X, Y }) {
    state.gridMatrix[Y][X].color = color;
    state.gridMatrix[Y][X].status = CELL.STATUS.MODIFIED;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
