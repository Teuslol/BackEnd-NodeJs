import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {

    static async listarLivros (req, res) {
        try {
          const listaLivros = await livro.find({});
          res.status(200).json(listaLivros);
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
      };


    static async listarLivroPorId (req,res){
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
            
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} -  falha na requisição do livro`});
        }
    }      

    static async cadastrarLivro (req,res) {
      const novolivro = req.body;
        try {
          const autorEncontrado = await autor.findById(novolivro.autor);
          const livroCompleto = {...novolivro, autor: {...autorEncontrado._doc}};  //operador de espalhamento do js
          const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({message:"Livro Cadastrado", livro: livroCriado});

        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro`});
        }
    };


    static async atualizarLivro (req,res){
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "livro atualizado"});
            
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao Atualizar`});
        }
    }

    static async excluirLivro (req, res) {
        try {
          const id = req.params.id;
          await livro.findByIdAndDelete(id);
          res.status(200).json({ message: "livro excluído com sucesso" });
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na exclusão` });
        }
      }


      static async listarLivroPorEditora (req,res){
        const editoraReq = req.query.editora;
        try {
          const livrosPorEditora = await livro.find({editora: editoraReq}); //o primeiro editora é o que vem da pesquisa e o q vai para o BD, O segundo é o que vem da requisição
          res.status(200).json(livrosPorEditora);
          } 
        catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na Busca` });
        }
      }



};

export default LivroController;