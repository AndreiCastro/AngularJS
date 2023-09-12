//Sempre tem que colocar o modulo que esta usando nesta controller
angular.module("myModule")


.controller("indexController", function($scope){
    
    /**** JavaScript ****/
    //variaveis
    var alunoEditar;

    //functions
    var calculaMedia = function(Aluno){
        return ((Aluno.nota1 + Aluno.nota2 + Aluno.nota3) / 3).toFixed(2); //.toFixed(2) arredondar 2 casas decimais
    };

    var init = function(){
        $scope.alunos.forEach(function(aluno){
            aluno.media = calculaMedia(aluno);
        });
        limpaForm();
    };    

    var limpaForm = function(){
        $scope.Aluno = {nome: "", email: "", nota1: '', nota2: '', nota3: ''};
    };
    


    /**** angularJS ****/
    //variaveis
    $scope.alunos = [
        {nome: "Andrei", email: "andrei@hotmail.com", nota1: 10, nota2: 0, nota3: 4},
        {nome: "Aline", email: "aline@hotmail.com", nota1: 2, nota2: 4, nota3: 10},
        {nome: "Mayara", email: "mayara@hotmail.com", nota1: 8, nota2: 10, nota3: 7},
        {nome: "José", email: "jose@hotmail.com", nota1: 0, nota2: 10, nota3: 8},
        {nome: "Maria", email: "maria@hotmail.com", nota1: 5, nota2: 8, nota3: 6}
    ];

    $scope.editando = false;
    
    $scope.titulo = "Site com AngularJS";            

    //functions (all are call in index.html)
    $scope.addAluno = function(Aluno){
        Aluno.media = calculaMedia(Aluno);
        $scope.alunos.push(Aluno);                    
        $scope.closeModal();
        limpaForm();                    
    };

    $scope.deleteAluno = function(Aluno){
        for(var index in $scope.alunos){
            var aux = $scope.alunos[index];
            if(Aluno === aux)
                $scope.alunos.splice(index, 1);
        }
    };

    $scope.updateAluno = function(Aluno){
        $scope.editando = true;
        angular.copy(Aluno, $scope.Aluno);                    
        $scope.openModal($scope.editando);
        alunoEditar = Aluno;
    };

    $scope.saveAluno = function(Aluno){
        alunoEditar.nome = Aluno.nome;
        alunoEditar.email = Aluno.email;
        alunoEditar.nota1 = Aluno.nota1;
        alunoEditar.nota2 = Aluno.nota2;
        alunoEditar.nota3 = Aluno.nota3;                    
        alunoEditar.media = calculaMedia(Aluno);
        $scope.closeModal();
    };

    $scope.openModal = function(edicao){        
        if(!edicao){
            $scope.editando = false;
            limpaForm(); 
        }
        $('#modalRef').modal('open');                    
    };

    $scope.closeModal = function(){
        limpaForm();
        $('#modalRef').modal('close');
    };


    init();  //function iniciada somente 1 vezes ao abrir a tela
})    