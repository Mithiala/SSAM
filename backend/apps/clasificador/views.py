import os

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..records.serializers import RegistryPredictionSerializer
from ..records.models import Condition,


class TrainModelView(APIView):
    def post(self, request, format=None):
        import numpy as np
        import pandas as pd
        import tensorflow as tf
        from sklearn.model_selection import train_test_split
        from sklearn.preprocessing import StandardScaler
        from sklearn.metrics import confusion_matrix, accuracy_score

        # Establecer una semilla aleatoria para numpy y tensorflow
        np.random.seed(42)
        tf.random.set_seed(42)

        # Cargar los datos desde un archivo CSV
        dataset = pd.read_csv("salud mental.csv")

        # Separar las variables predictoras y la variable objetivo
        X = dataset.iloc[:, :-1].values
        y = dataset.iloc[:, -1].values

        # Dividir los datos en conjuntos de entrenamiento y prueba
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.75, random_state=42
        )

        # Normalizar los datos de entrenamiento y prueba
        sc = StandardScaler()
        X_train = sc.fit_transform(X_train)
        X_test = sc.transform(X_test)
        input_shape = (X_train.shape[1],)

        # Crear un modelo de redes neuronales utilizando TensorFlow
        model = tf.keras.models.Sequential(
            [
                tf.keras.layers.Dense(
                    75, activation="relu", input_shape=(X_train.shape[1],)
                ),
                tf.keras.layers.Dropout(0.1),
                tf.keras.layers.Dense(7, activation="softmax"),
            ]
        )

        # Compilar el modelo
        model.compile(
            optimizer="adam",
            loss="sparse_categorical_crossentropy",
            metrics=["accuracy"],
        )

        # Entrenar el modelo
        history = model.fit(
            X_train,
            y_train,
            batch_size=10,
            epochs=100,
            validation_data=(X_test, y_test),
        )
        train_loss = history.history["loss"]
        val_loss = history.history["val_loss"]

        # Evaluar el modelo utilizando los datos de prueba
        y_pred = model.predict(X_test)
        y_pred = np.argmax(y_pred, axis=1)

        # Calcular la matriz de confusión
        cm = confusion_matrix(y_test, y_pred)

        # Imprimir la matriz de confusión en consola
        print("Matriz de confusión:")
        print(cm)

        # Calcular el accuracy del modelo
        accuracy = accuracy_score(y_test, y_pred)
        print("Accuracy:", accuracy)

        # Crear un diccionario que mapee las etiquetas numéricas a los nombres de las clases
        etiquetas_num = np.unique(y_train)
        nombres_clases = [
            "Demencia",
            "Retrazo Mental",
            "Trastorno Lenguaje",
            "Orientación",
            "Atención",
            "Memoria",
            "Normal",
        ]
        diccionario_clases = {
            etiquetas_num[i]: nombres_clases[i] for i in range(len(etiquetas_num))
        }

        # Normalizar los datos del adulto mayor
        datos_adulto_mayor = np.array([[5, 5, 3, 1, 1, 1, 1]])
        datos_adulto_mayor_norm = sc.transform(datos_adulto_mayor)

        # Obtener la predicción de la clase utilizandoel modelo
        prediccion = model.predict(datos_adulto_mayor_norm)
        clase_predicha_num = np.argmax(prediccion, axis=1)
        clase_predicha_nombre = diccionario_clases[clase_predicha_num[0]]

        return Response(
            status=status.HTTP_200_OK,
        )


# class PredictView(APIView):
#     def get(self, request):
#         from keras.models import load_model

#         return Response(
#             "Predicciones guardadas en la base de datos", status=status.HTTP_200_OK
#         )
