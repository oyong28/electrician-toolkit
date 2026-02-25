/**
 * src/i18n.js
 *
 * Purpose:
 * - Adds app-wide language support (English + Spanish) using i18next.
 * - Remembers the user's selected language in localStorage.
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const STORAGE_KEY = "etk_lang";
const savedLang = localStorage.getItem(STORAGE_KEY);

i18n.use(initReactI18next).init({
  lng: savedLang || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        header: {
          title: "Electrician Toolkit",
          tools: "Tools",
          home: "Home",
          language: "Language",
        },

        sidebar: {
          ohmsLaw: "Ohm's Law",
          wireColor: "Wire Color Guide",
          conduitBending: "Conduit Bending",
          tapeFraction: "Tape Fraction Calc",
          voltageDrop: "Voltage Drop",
        },

        ohmsLaw: {
          title: "Ohm's Law",
          power: "Power (P):",
          voltage: "Voltage (E):",
          current: "Current (I):",
          resistance: "Resistance (R):",
          placeholderUnknown: "Leave blank if unknown",
          placeholderVolts: "Volts",
          placeholderAmps: "Amps",
          placeholderSolveResistance: "Leave blank if solving for Resistance",
          calculate: "Calculate",
          results: "Results",
          errorTwoValues: "Please provide at least two known values.",
          errorCalc: "Calculation error. Please check your inputs.",
        },

        wireColor: {
          title: "Wire Color Guide",
          voltageSystem: "Voltage System",
          circuitNumber: "Circuit Number",
          placeholderCircuit: "e.g. 34",
          getWireColor: "Get Wire Color",

          resultPrefix: "Circuit #{{num}} uses",
          resultSuffix: "wire.",

          errorEnterCircuit: "Please enter a circuit number.",
          errorValidCircuit: "Please enter a valid circuit number.",
          errorGeneric:
            "Unable to determine wire color. Please check your inputs.",
        },

        colors: {
          black: "Black",
          red: "Red",
          blue: "Blue",
          brown: "Brown",
          orange: "Orange",
          yellow: "Yellow",
        },

        conduitBending: {
          title: "Conduit Bending",

          modeLabel: "Offset Type",
          angleLabel: "Bend Angle",

          modes: {
            offset: "2-Bend Offset",
            rolling: "Rolling Offset",
            saddle3: "3-Bend Saddle",
            saddle4: "4-Bend Saddle",
          },

          saddle3AngleHint: "3-bend saddle uses 22.5°-45°-22.5°",
          angleOption: "{{label}} (mult {{mult}})",

          offsetDistance: "Offset Distance",
          rise: "Rise",
          roll: "Roll",
          saddleHeight: "Saddle Height",
          saddleWidthSpan: "Saddle Width / Span",

          placeholders: {
            offset: 'Examples: 4 1/4   |   3/16   |   10"',
            rise: "Examples: 6   |   6 1/2   |   5-7/8",
            roll: "Examples: 8   |   8 3/16   |   7-1/4",
            saddleHeight: "Examples: 2   |   2 1/2   |   1-3/4",
            saddleHeight4: "Example: 2",
            saddleWidth: "Example: 6",
          },

          parsed: "Parsed:",

          labels: {
            angle: "Angle",
            angleAll4: "Angle (all 4 bends)",
            multiplier: "Multiplier",
            distanceBetweenMarks: "Distance between marks",
            shrink: "Shrink",
            trueOffset: "True offset (diagonal)",
            bends: "Bends",
            saddleHeight: "Saddle height",
            centerMarkAdvance: "Center mark advance",
            outerMarksFromCenter: "Outer marks from center (each side)",
            outerToCenterSpacing: "Outer ↔ center spacing",
            saddleWidthSpan: "Saddle width/span",
            markSpacingEachOffset: "Mark spacing (each offset)",
            shrinkPerSide: "Shrink per side",
            totalShrink: "Total shrink (both sides)",
            innerMarksFromCenter: "From obstacle center: inner marks",
            outerMarksFromCenter2: "From obstacle center: outer marks",
          },

          results: {
            offsetTitle: "Offset Results (nearest 1/16)",
            rollingTitle: "Rolling Offset Results (nearest 1/16)",
            saddle3Title: "3-Bend Saddle Results (nearest 1/16)",
            saddle4Title: "4-Bend Saddle Results (nearest 1/16)",
          },

          notes: {
            offsetNote:
              "Distance between marks = spacing for two bend marks. Shrink = how much the run shortens due to the offset.",
            rollingNote:
              "Rolling offset uses true offset from Rise/Roll, then applies the same multiplier + shrink for the selected angle.",
            saddle3Note:
              "Mark the obstacle centerline, add the center advance for the center mark, then measure the outer mark distance on both sides.",
            saddle4Note:
              "Inner marks are at ±(width/2). Outer marks are at ±(width/2 + mark spacing). Bend order stays consistent and in the same plane.",
          },

          errors: {
            selectOption: "Select an option.",
            offsetInvalid:
              "Enter a valid Offset greater than 0. Example: 4 1/4",
            rollingInvalid:
              "Enter valid Rise and Roll greater than 0. Example: Rise 6, Roll 8",
            saddleHeightInvalid:
              "Enter a valid Saddle Height greater than 0. Example: 2 1/2",
            saddleHeightInvalid4:
              "Enter a valid Saddle Height greater than 0. Example: 2",
            saddleWidthInvalid:
              "Enter a valid Saddle Width/Span greater than 0. Example: 6",
          },
        },

        tapeFraction: {
          title: "Tape Fraction Calculator",
          aLabel: "Measurement A",
          bLabel: "Measurement B",
          opLabel: "Operation",
          parsed: "Parsed:",
          resultLabel: "Result",

          placeholders: {
            a: "Examples: 3 1/2, 5-7/8, 10' 2 3/16\"",
            b: 'Examples: 1 1/4, 3/16, 2"',
          },

          ops: {
            add: "Add (+)",
            subtract: "Subtract (−)",
            multiply: "Multiply (×)",
            divide: "Divide (÷)",
          },

          errors: {
            twoValid: "Enter two valid tape measurements.",
            divideByZero: "Cannot divide by zero.",
            generic: "Calculation error. Please check your inputs.",
          },
        },

        voltageDrop: {
          title: "Voltage Drop",
          system: "System",
          systemSingle: "Single-Phase",
          systemThree: "Three-Phase",

          material: "Conductor Material",
          materialCopper: "Copper (K=12.9)",
          materialAluminum: "Aluminum (K=21.2)",

          wire: "Conductor Size",

          voltageLabel: "System Voltage (V)",
          ampsLabel: "Load Current (A)",
          lengthLabel: "One-Way Length (ft)",

          placeholders: {
            voltage: "Example: 120",
            amps: "Example: 20",
            length: "Example: 100",
          },

          resultVd: "Voltage Drop",
          resultPct: "% Drop",
          resultLoadV: "Estimated Voltage at Load",

          footerNote: "Factor={{factor}}, K={{k}}, length is one-way.",

          errors: {
            voltage: "Enter a valid system voltage.",
            amps: "Enter valid amperage > 0.",
            length: "Enter valid one-way length (ft) > 0.",
            wire: "Select a conductor size.",
          },
        },
      },
    },

    es: {
      translation: {
        header: {
          title: "Kit de Herramientas para Electricistas",
          tools: "Herramientas",
          home: "Inicio",
          language: "Idioma",
        },

        sidebar: {
          ohmsLaw: "Ley de Ohm",
          wireColor: "Guía de Colores de Cable",
          conduitBending: "Doblado de Conduit",
          tapeFraction: "Calculadora de Fracciones",
          voltageDrop: "Caída de Voltaje",
        },

        ohmsLaw: {
          title: "Ley de Ohm",
          power: "Potencia (P):",
          voltage: "Voltaje (E):",
          current: "Corriente (I):",
          resistance: "Resistencia (R):",
          placeholderUnknown: "Dejar en blanco si es desconocido",
          placeholderVolts: "Voltios",
          placeholderAmps: "Amperios",
          placeholderSolveResistance:
            "Dejar en blanco si se calcula la Resistencia",
          calculate: "Calcular",
          results: "Resultados",
          errorTwoValues:
            "Por favor proporciona al menos dos valores conocidos.",
          errorCalc: "Error de cálculo. Verifica los valores ingresados.",
        },

        wireColor: {
          title: "Guía de Colores de Cable",
          voltageSystem: "Sistema de Voltaje",
          circuitNumber: "Número de Circuito",
          placeholderCircuit: "ej. 34",
          getWireColor: "Obtener Color",

          resultPrefix: "Circuito #{{num}} usa",
          resultSuffix: "cable.",

          errorEnterCircuit: "Por favor ingresa un número de circuito.",
          errorValidCircuit: "Por favor ingresa un número de circuito válido.",
          errorGeneric:
            "No se pudo determinar el color del cable. Verifica los datos.",
        },

        colors: {
          black: "Negro",
          red: "Rojo",
          blue: "Azul",
          brown: "Marrón",
          orange: "Naranja",
          yellow: "Amarillo",
        },

        conduitBending: {
          title: "Doblado de Conduit",

          modeLabel: "Tipo de Cálculo",
          angleLabel: "Ángulo de Doblado",

          modes: {
            offset: "Offset de 2 Dobles",
            rolling: "Offset Rodado",
            saddle3: "Silla de 3 Dobles",
            saddle4: "Silla de 4 Dobles",
          },

          saddle3AngleHint: "La silla de 3 dobles usa 22.5°-45°-22.5°",
          angleOption: "{{label}} (mult {{mult}})",

          offsetDistance: "Distancia del Offset",
          rise: "Subida (Rise)",
          roll: "Desplazamiento (Roll)",
          saddleHeight: "Altura de la Silla",
          saddleWidthSpan: "Ancho / Separación",

          placeholders: {
            offset: 'Ejemplos: 4 1/4   |   3/16   |   10"',
            rise: "Ejemplos: 6   |   6 1/2   |   5-7/8",
            roll: "Ejemplos: 8   |   8 3/16   |   7-1/4",
            saddleHeight: "Ejemplos: 2   |   2 1/2   |   1-3/4",
            saddleHeight4: "Ejemplo: 2",
            saddleWidth: "Ejemplo: 6",
          },

          parsed: "Interpretado:",

          labels: {
            angle: "Ángulo",
            angleAll4: "Ángulo (los 4 dobles)",
            multiplier: "Multiplicador",
            distanceBetweenMarks: "Distancia entre marcas",
            shrink: "Encogimiento (Shrink)",
            trueOffset: "Offset real (diagonal)",
            bends: "Dobles",
            saddleHeight: "Altura de la silla",
            centerMarkAdvance: "Avance de la marca central",
            outerMarksFromCenter:
              "Marcas exteriores desde el centro (cada lado)",
            outerToCenterSpacing: "Separación exterior ↔ centro",
            saddleWidthSpan: "Ancho/separación",
            markSpacingEachOffset: "Separación de marcas (cada offset)",
            shrinkPerSide: "Shrink por lado",
            totalShrink: "Shrink total (ambos lados)",
            innerMarksFromCenter:
              "Desde el centro del obstáculo: marcas internas",
            outerMarksFromCenter2:
              "Desde el centro del obstáculo: marcas externas",
          },

          results: {
            offsetTitle: "Resultados de Offset (al 1/16 más cercano)",
            rollingTitle: "Resultados de Offset Rodado (al 1/16 más cercano)",
            saddle3Title:
              "Resultados de Silla de 3 Dobles (al 1/16 más cercano)",
            saddle4Title:
              "Resultados de Silla de 4 Dobles (al 1/16 más cercano)",
          },

          notes: {
            offsetNote:
              "Distancia entre marcas = separación de las dos marcas de doble. Shrink = cuánto se acorta la corrida debido al offset.",
            rollingNote:
              "El offset rodado usa el offset real (Rise/Roll) y aplica el mismo multiplicador + shrink para el ángulo seleccionado.",
            saddle3Note:
              "Marca la línea central del obstáculo, suma el avance para la marca central y luego mide la distancia de las marcas exteriores a ambos lados.",
            saddle4Note:
              "Las marcas internas están en ±(ancho/2). Las marcas externas están en ±(ancho/2 + separación). El orden de dobles se mantiene en el mismo plano.",
          },

          errors: {
            selectOption: "Selecciona una opción.",
            offsetInvalid:
              "Ingresa un Offset válido mayor que 0. Ejemplo: 4 1/4",
            rollingInvalid:
              "Ingresa Rise y Roll válidos mayores que 0. Ejemplo: Rise 6, Roll 8",
            saddleHeightInvalid:
              "Ingresa una Altura de Silla válida mayor que 0. Ejemplo: 2 1/2",
            saddleHeightInvalid4:
              "Ingresa una Altura de Silla válida mayor que 0. Ejemplo: 2",
            saddleWidthInvalid:
              "Ingresa un Ancho/Separación válido mayor que 0. Ejemplo: 6",
          },
        },

        tapeFraction: {
          title: "Calculadora de Fracciones (Cinta)",
          aLabel: "Medida A",
          bLabel: "Medida B",
          opLabel: "Operación",
          parsed: "Interpretado:",
          resultLabel: "Resultado",

          placeholders: {
            a: "Ejemplos: 3 1/2, 5-7/8, 10' 2 3/16\"",
            b: 'Ejemplos: 1 1/4, 3/16, 2"',
          },

          ops: {
            add: "Sumar (+)",
            subtract: "Restar (−)",
            multiply: "Multiplicar (×)",
            divide: "Dividir (÷)",
          },

          errors: {
            twoValid: "Ingresa dos medidas válidas.",
            divideByZero: "No se puede dividir entre cero.",
            generic: "Error de cálculo. Verifica los datos ingresados.",
          },
        },

        voltageDrop: {
          title: "Caída de Voltaje",
          system: "Sistema",
          systemSingle: "Monofásico",
          systemThree: "Trifásico",

          material: "Material del Conductor",
          materialCopper: "Cobre (K=12.9)",
          materialAluminum: "Aluminio (K=21.2)",

          wire: "Calibre del Conductor",

          voltageLabel: "Voltaje del Sistema (V)",
          ampsLabel: "Corriente de Carga (A)",
          lengthLabel: "Longitud (una vía) (ft)",

          placeholders: {
            voltage: "Ejemplo: 120",
            amps: "Ejemplo: 20",
            length: "Ejemplo: 100",
          },

          resultVd: "Caída de Voltaje",
          resultPct: "% de Caída",
          resultLoadV: "Voltaje Estimado en la Carga",

          footerNote: "Factor={{factor}}, K={{k}}, la longitud es de una vía.",

          errors: {
            voltage: "Ingresa un voltaje válido del sistema.",
            amps: "Ingresa una corriente válida > 0.",
            length: "Ingresa una longitud válida (ft) > 0.",
            wire: "Selecciona un calibre de conductor.",
          },
        },
      },
    },
  },
});

// Persist language changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
});

export default i18n;
