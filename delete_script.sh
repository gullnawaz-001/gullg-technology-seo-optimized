#!/bin/bash
sed -i '148,$d' src/modules/Calculator.tsx
echo "      </div>" >> src/modules/Calculator.tsx
echo "    </div>" >> src/modules/Calculator.tsx
echo "  );" >> src/modules/Calculator.tsx
echo "}" >> src/modules/Calculator.tsx
