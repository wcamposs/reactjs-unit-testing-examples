Vídeo da Rocketseat usado: https://www.youtube.com/watch?v=edXudaVB0Bg

Base dos testes:

- Metodos que começam com getBy procuram um único elemento (obs: getBy quando tem mais de um elemento que satisfaça a condição, também falha, assim como quando não encontra nenhum);
- Metodos que começam por queryBy não falham quando não encontram o determinado elemento;
- Metodos que começam por find é parecido com o getBy, porém, ele espera que o elemento apareça em tela;

- Em todos os expects o Jest, pode ser passado um .not. antes de uma asserção para validar se o elemento NÃO existe;
