<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">

    <xsl:template match="/">

        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Arquivo Sonoro EVO</title>
                </head>
                <body>
                    <h2>Arquivo Sonoro EVO</h2>
                    <h3>Índice de Músicas</h3>

                    <ol>
                        <xsl:apply-templates select="//doc" mode="indice">
                            <xsl:sort select="tit"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>

        <!-- gerar páginas individuais para cada registo -->
        <xsl:apply-templates/>
    </xsl:template>

    <!-- Templates de índice -->
    <xsl:template match="doc" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="tit"/>
            </a>
        </li>
    </xsl:template>

    <!-- Templates para o conteúdo -->
    <xsl:template match="doc">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="tit"/>
                    </title>
                </head>
                <body>
                    <p>
                        <b>Título:</b>
                        <xsl:value-of select="tit"/>
                    </p>
                    <p>
                        <b>Província:</b>
                        <xsl:value-of select="prov"/>
                    </p>
                    <p>
                        <b>Local:</b>
                        <xsl:value-of select="local"/>
                    </p>
                    <p>
                        <b>Instrumento:</b>
                        <xsl:value-of select="inst"/>
                    </p>
                    <p>
                        <b>Duração:</b>
                        <xsl:value-of select="duracao"/>
                    </p>
                    <address> [<a href="index.html#i{generate-id()}">Página Principal</a>]</address>
                </body>
            </html>

        </xsl:result-document>


    </xsl:template>

</xsl:stylesheet>
