'''
Script de preparação do dataset inicial.
Adiciona formatação de array.
Adiciona vírgulas no fim de cada linha.
Adiciona um 'fid' a cada entrada.
'''

dataset = open('filmes.json', 'r')
linhas = dataset.readlines()
nr_linhas = len(linhas)

final = open('filmes_processado.json', 'a')

final.write('[\n')
for i in range(nr_linhas-1):
	linha = linhas[i][:-2]
	linha += ', "fid": "' + str(i+1) + '"},\n'
	final.write('\t' + linha)

linha = linhas[nr_linhas-1][:-2]
linha += ', "fid": "' + str(nr_linhas) + '"}\n'
final.write('\t' + linha)

final.write(']')

final.close()

print('Ficheiro escrito com sucesso...')