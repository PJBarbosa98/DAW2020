<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        
        <!-- Operations for index.html -->
        <xsl:result-document href="src/index.html">
            <html>
                <head>
                    <title>Arqueossítios do NW português</title>
                </head>
                <body>
                    <h2>Arqueossítios do NW português</h2>
                    <h3>Índice dos Registos</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        
        <!-- Operations for each register's webpage -->
        <xsl:apply-templates/>

    </xsl:template>
    
    
    <!-- DEFINED TEMPLATES HERE ................................................. -->
    
    <!-- Template for `indice` mode -->
    <xsl:template match="//ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Template for individual registers -->
    <xsl:template match="//ARQELEM">
        
        <xsl:result-document href="src/{generate-id()}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    <h1>PÁGINA PARA <xsl:value-of select="IDENTI"/></h1>
                    <p>UNDER CONSTRUCTION...</p>
                    
                    <address> [<a href="index.html#i{generate-id()}">Página Principal</a>]</address>
                </body>
            </html>
        </xsl:result-document>
        
    </xsl:template>
    
</xsl:stylesheet>




