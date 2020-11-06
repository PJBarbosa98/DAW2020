'''
@FILE: 	add_xml_id
@BRIEF:	Python Script to add an incremental `id` attribute to XML dataset.

For example this

<ARQSITS>
	<ARQELEM>
		...
	</ARQELEM>
	<ARQELEM>
		...
	</ARQELEM>
	...
</ARQSITS>

Becomes this

<ARQSITS>
	<ARQELEM id=1>
		...
	</ARQELEM>
	<ARQELEM id=2>
		...
	</ARQELEM>
	...
</ARQSITS>
'''

import xml.etree.cElementTree as ET

tree = ET.parse('arq.xml')
root = tree.getroot()

i = 1
for element in root.findall('ARQELEM'):
	element.set('id', str(i))
	i = i+1

tree.write('arq_with_id.xml')