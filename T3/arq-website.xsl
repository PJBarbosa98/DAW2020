<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">

    <xsl:template match="/">

        <!-- Operations for index.html -->
        <xsl:result-document href="src/index.html">
            <html>
                <head>
                    <title>Arqueossítios do NW português</title>
                    <style type="text/css">
                        body {
                            margin: 40px;
                            font-family: 'Roboto', sans-serif;
                        }
                        h2 {
                            display: block;
                            text-align: center;
                        }
                        .my-index {
                            display: block;
                            text-align: center;
                            margin-top: 40px;
                            border-style: solid;
                            border-radius: 1px;
                        }</style>
                </head>
                <body>
                    <h2> Arqueossítios do NW português </h2>

                    <div class="my-index">
                        <h3>Índice dos Registos</h3>
                        <ol>
                            <xsl:apply-templates select="//ARQELEM" mode="indice">
                                <xsl:sort select="IDENTI"/>
                            </xsl:apply-templates>
                        </ol>
                    </div>


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
                    <style type="text/css">
                        body {
                            margin: 40px;
                            font-family: 'Roboto', sans-serif;
                        }
                        
                        h1 {
                            display: block;
                            text-align: center;
                            margin-bottom: 40px;
                        }
                        
                        p {
                            display: block;
                            text-align: justify;
                            text-justify: inter-word;
                        }
                        
                        address {
                            margin-top: 40px;
                        }
                    </style>
                </head>
                <body>
                    <h1>
                        <xsl:value-of select="IDENTI"/>
                    </h1>

                    <p>
                        <b>Tipo: </b>
                        <xsl:value-of select="TIPO/@ASSUNTO"/>
                    </p>

                    <p>
                        <b>Descrição: </b>
                        <xsl:value-of select="DESCRI"/>
                    </p>

                    <xsl:if test="CRONO">
                        <b>Cronologia: </b>
                        <xsl:value-of select="CRONO"/>
                    </xsl:if>

                    <p>
                        <b>Lugar: </b>
                        <xsl:value-of select="LUGAR"/>
                    </p>

                    <p>
                        <b>Freguesia: </b>
                        <xsl:value-of select="FREGUE"/>
                    </p>

                    <p>
                        <b>Concelho: </b>
                        <xsl:value-of select="CONCEL"/>
                    </p>

                    <xsl:if test="CODADM">
                        <p>
                            <b>Coda DM: </b>
                            <xsl:value-of select="CODADM"/>
                        </p>
                    </xsl:if>

                    <xsl:if test="LATITU">
                        <p>
                            <b>Latitude: </b>
                            <xsl:value-of select="LATITU"/>
                        </p>
                    </xsl:if>

                    <xsl:if test="LONGIT">
                        <p>
                            <b>Longitude: </b>
                            <xsl:value-of select="LONGIT"/>
                        </p>
                    </xsl:if>

                    <xsl:if test="ALTITU">
                        <p>
                            <b>Altitude: </b>
                            <xsl:value-of select="ALTITU"/>
                        </p>
                    </xsl:if>

                    <xsl:if test="ACESSO">
                        <p>
                            <b>Acesso: </b>
                            <xsl:value-of select="ACESSO"/>
                        </p>
                    </xsl:if>

                    <xsl:if test="QUADRO">
                        <p>
                            <b>Quadro: </b>
                            <xsl:value-of select="QUADRO"/>
                        </p>
                    </xsl:if>

                    <xsl:if test="TRAARQ">
                        <p>
                            <b>Traarq.: </b>
                            <xsl:value-of select="TRAARQ"/>
                        </p>
                    </xsl:if>

                    <p>
                        <b>Desarq.: </b>
                        <xsl:value-of select="DESARQ"/>
                    </p>

                    <xsl:if test="INTERP">
                        <p>
                            <b>Interp.: </b>
                            <xsl:value-of select="INTERP"/>
                        </p>
                    </xsl:if>

                    <xsl:if test="INTERE">
                        <p>
                            <b>Intere.: </b>
                            <xsl:value-of select="INTERE"/>
                        </p>
                    </xsl:if>

                    <xsl:if test="DEPOSI">
                        <p>
                            <b>Deposi.: </b>
                            <xsl:value-of select="DEPOSI"/>
                        </p>
                    </xsl:if>

                    <xsl:if test="BIBLIO">
                        <p>
                            <b>Bibliografia: </b>
                            <ul>
                                <xsl:for-each select="BIBLIO">
                                    <li>
                                        <xsl:value-of select="text()"/>
                                        <br/>
                                    </li>
                                </xsl:for-each>
                            </ul>
                        </p>
                    </xsl:if>

                    <p>
                        <b>Autor: </b>
                        <xsl:value-of select="AUTOR"/>
                    </p>

                    <p>
                        <b>Data: </b>
                        <xsl:value-of select="DATA"/>
                    </p>

                    <address> [<a href="index.html#i{generate-id()}">Página Principal</a>]</address>
                </body>
            </html>
        </xsl:result-document>

    </xsl:template>

</xsl:stylesheet>
