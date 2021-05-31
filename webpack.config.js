const path = require('path'); //path - Модуль для работы с путями//
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   entry: './src/scriptClient.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'), 
   },
   context: path.resolve(__dirname, 'src'),
   entry: {
      main: './indexClient.js', // Запись через main первым файлом обязательна
      restClient: './RestClient.js', // В энтри вы конфигурим входные .js
      // reviewsClient: './ReviewsClient.js', //Нюанс в сборке при наличии провайдера - класса,
      scriptClient: './scriptClient.js', 
   },   
   output: {
      filename: '[name].bundle.js', // Эта запись служит для того, ятобы наши файлы .js собрались в НЕСКОЛЬКО бандов
      path: path.resolve(__dirname, 'dist'),
   },
   optimization: {
      splitChunks: {
         chunks: 'all' // Эта запись нацелена на маскировку и своеобразную кодировку чанок.
      }
   },
   devServer: {
      port: 4200, // Тут устанавливаем сервак, на котором работает наша прилага. Запускается через npm run start
   },
   plugins: [
      new HTMLWebpackPlugin({ // Тут подключаем различные плагины, предварительно установив их из npm
         title: 'My suite', // К примеру этот задают тайтл ручками
         template: './index.html',  // Этот спутывает html (если не ощибаюсь)
      }),
      new CleanWebpackPlugin(),
   ],
   resolve: {
      extensions: ['.js', '.css'], // Служит для сокраащения и красоты , можно записывать без расширений .css .js и  тд
      alias: {
         '@assets': path.resolve(__dirname, 'src/assets/'), // Данное правило служит для подключения css к проекту
         '@fonts': path.resolve(__dirname, 'src/assets/Fonts'),
      }
   },
   module: {
      rules: [
         {
            test: /.css$/,   // Данное правило служит для подключения css к проекту
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /.(png|jpg|svg|gif)$/,
            use: ['file-loader'], // Данное правило - для подключения изображений( к примеру когда фон это картинка)
         },
         {
            test: /.(ttf|otf)$/,
            use: ['file-loader'],  // А это для подключения шрифтов
         },
      ],
   },
};

