/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import Dialog from 'material-ui/Dialog';
import {deepOrange500, red500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


//Estilos dos elementos principais
const styles = {

	container: {
		maxWidth:'500px',
		minWidth: '300px',
		textAlign: 'center',
		width:"80%",
		margin: "auto",
		marginTop: "20px",
		marginBottom: "20px"
	},
	openInsertRowButton: {
		textAlign: "right"
	},
	addRowButton:{
		float:"right",		
		marginRight: "10%"
	},
	totalDisplayContainer: {
		height: "60px"
	},
	totalDisplay: {
		float:"right",
		marginRight: "20px",
		marginTop: "14px",
		marginBotton: "20px"
	},
	dialog:{
		float:"right",
		maxWidth:'500px',
	},
	numberAlign: {
		textAlign:"right"
	},
	orangeFont:{
		color:deepOrange500
	}

};

const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrange500,
	},
});

// Classe Main - 
class Main extends Component {
	constructor(props, context) {
		super(props, context);

		this.handleInsertRow = this.handleInsertRow.bind(this);
		this.handleDeleteRow = this.handleDeleteRow.bind(this);
		this.handleOpenModalInsertRow = this.handleOpenModalInsertRow.bind(this);
		this.handleCloseModalInsertRow = this.handleCloseModalInsertRow.bind(this);
		this.handleTransTypeChange = this.handleTransTypeChange.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		//Dados do estado inicial
		this.state = {
			tableData : [
				{
					type: 'Depósito',
					amount: "122.55"
				},
				{
					type: 'Saque',
					amount: 80
				},
				{
					type: 'Depósito',
					amount: 500
				},
			]
		};
		this.state["currentAmount"] = 0;
		this.state["currentTransType"] = "Deposito";

	}

	handleDeleteRow(e) {
		//alert("removerei");
		var tableDataIndex = e.currentTarget.closest("tr").id;
		//removendo dado
		var ask = confirm("Tem certeza que deseja excluir?");
		if (ask == true) {
		  	this.state.tableData.splice(tableDataIndex,1);
			this.setState(this.state);
		} 
	}

	handleOpenModalInsertRow() {
		this.state.openModalInsertRow = true;
		this.setState(this.state);
	};

	handleCloseModalInsertRow() {
		this.state.openModalInsertRow = false;
		this.setState(this.state);
	};

	handleInsertRow() {
		this.state.openModalInsertRow = false;
		var newRow = { 
			type:this.state.currentTransType, 
			amount:this.state.currentAmount.replace(/[^0-9]/g, '')
		};
		this.state.tableData.push( newRow );
		this.setState(this.state);
	}

	handleTransTypeChange (e) {
		this.state.currentTransType = e.target.value;
	}

	handleAmountChange (e) {
		this.state.currentAmount = e.target.value;
	}


	//Retorna o total
	getTotal() {
		var lenTableData = this.state.tableData.length;
		var total = 0;
		for (var i = 0; i < lenTableData; i++) {
		    if(this.state.tableData[i].type == "Saque") {
		    	total -= parseFloat(this.state.tableData[i].amount);
		    }
		    else {
		    	total += parseFloat(this.state.tableData[i].amount);
		    }
		}
		return total.toFixed(2);
	}

	//Função que desenha os elementos
	//na tela a cada ação
	render() {

		//Definindo os botões

		const InsertRowButton = (
			<RaisedButton
				label="Inserir"
				style={styles.addRowButton}
				primary={true}
				icon={<ContentAdd />}
				onTouchTap={this.handleOpenModalInsertRow}
			/>
		);	

		const ConfirmDialog = (
			<Dialog
				style={styles.dialog}
				modal={true}
				open={this.state.openModalInsertRow}
				onRequestClose={this.handleCloseModalInsertRow}
			>
				<RadioButtonGroup 
					onChange={this.handleTransTypeChange} 
					name="transactionType" 
					defaultSelected="Deposito"
				>
					<RadioButton
						value="Deposito"
						label="Depósito"
					/>
					<RadioButton
						value="Saque"
						label="Saque"
					/>
				</RadioButtonGroup>
				<TextField
					name="amount"
					type="number"
					maxLength={20}
					onChange={this.handleAmountChange}
					floatingLabelText="Digite o valor"
				/>
				<br /><br />
				<RaisedButton
					label="Cancelar"
					default={true}
					onTouchTap={this.handleCloseModalInsertRow}
				/>
				<RaisedButton
					label="Inserir"
					primary={true}
					onTouchTap={this.handleInsertRow}
				/>
			</Dialog>
		)

		const ButtonDeleteRow = (
			<IconButton
				onClick={this.handleDeleteRow}
			>
				<Delete 
					color={"rgb(0, 188, 212)"}
				/>
			</IconButton>
		);

		const TableBalanceExtract =  (
			<Card style={styles.container}>
				<Table
					id="TableBalance"
					fixedHeader={true}
					fixedFooter={true}
					displaySelectAll={false}
					selectable={false}
	            	adjustForCheckbox={false}
	            	displayRowCheckbox={false}
	            >
					<TableHeader
	            		displaySelectAll={false}
	            		adjustForCheckbox={false}
	            	>

						<TableRow>
							<TableHeaderColumn tooltip="Tipo de movimentação" >Tipo</TableHeaderColumn>
							<TableHeaderColumn tooltip="Valor da movimentação" style={styles.numberAlign}>Valor</TableHeaderColumn>
							<TableHeaderColumn >Excluir</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody
					 	showRowHover={true}
					 	stripedRows={true}
						displayRowCheckbox={false}
					>
						{	//Faz um loop na this.state.tableData e vai criando as trs
							this.state.tableData.map(function(row,key) {
							   return(
									<TableRow id={key} selected={row.selected}>
										<TableRowColumn> {row.type}</TableRowColumn>
										<TableRowColumn style={styles.numberAlign}>{row.amount}</TableRowColumn>
										<TableRowColumn> {ButtonDeleteRow} </TableRowColumn>
									</TableRow>
								);
							})
						}
					</TableBody>
				</Table>
			</Card>
		);

		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div style={styles.container}>
					<h1>Teste Front-end S2IT</h1>
					<Paper>
						<AppBar
							title="Controle Movimentação"
							iconClassNameRight="muidocs-icon-navigation-expand-more"
						/>
						{TableBalanceExtract}
						{ConfirmDialog}
						{InsertRowButton}
						<div style={styles.totalDisplayContainer}>
							<h2 style={styles.totalDisplay}>
								Total: { this.getTotal() } 
							</h2>
						</div>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Main;
