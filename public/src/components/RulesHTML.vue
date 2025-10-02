<template>
  <section id="rules">
    <h1>Правила написания HTML-кода при создании статьи:</h1>
    <h2>1. Можно использовать ИСКЛЮЧИТЕЛЬНО следующие теги:</h2>
    <p>h2 - Подзаголовки,<br>
       p - Основной текст,<br>
       ul, ol - Списки,<br>
       li - Элементы списка,<br>
       pre - Для оформления кода.</p>
    <h2>2. Запрещено дублирование статей:</h2>
    <p>Если на этапе модерации будет выявлено, что статья с подобным контентом уже существует - она будет отклонена.</p>
    <h2>3. Списки:</h2>
    <p>Списки (ul/ol) должны содержать хотя бы один элемент li.</p>
    <h2>4. Код:</h2>
    <p>Код должен оформляться только внутри тега pre.<br>
       Внутри pre запрещено использовать другие HTML-теги.</p>
    <h2>5. Текст:</h2>
    <p>Минимальная длина текста в параграфе - 10 символов.<br>
       Не допускается использование лишних пробелов, табуляций и пустых строк подряд.<br>
       <b>Строго запрещено использование нецензурной лексики и оскорблений!</b></p>
    <h2>6. Запрещённые элементы:</h2>
    <p>Нельзя использовать inline-стили (атрибут style).<br>
       Запрещены iframe, script, img, video, audio, a, таблицы и любые нестандартные HTML5 теги.</p>
    <h1>Пример правильного HTML-кода:</h1>
    <pre>&lt;h2&gt;Что такое алгоритм?&lt;/h2&gt;
&lt;p&gt;Алгоритм — это последовательность шагов, которые нужно выполнить, чтобы достичь определённой цели или решить задачу. Простыми словами — это инструкция.&lt;/p&gt;
&lt;h2&gt;Примеры алгоритмов в повседневной жизни&lt;/h2&gt;
&lt;ul&gt;
  &lt;li&gt;Рецепт приготовления блюда&lt;/li&gt;
  &lt;li&gt;Пошаговое руководство по сборке мебели&lt;/li&gt;
  &lt;li&gt;Маршрут, построенный навигатором&lt;/li&gt;
&lt;/ul&gt;
&lt;h2&gt;Примеры алгоритмов в программировании&lt;/h2&gt;
&lt;p&gt;В информатике алгоритмы играют ключевую роль. Вот несколько известных примеров:&lt;/p&gt;
&lt;ol&gt;
  &lt;li&gt;Сортировка чисел по возрастанию&lt;/li&gt;
  &lt;li&gt;Поиск наибольшего элемента в массиве&lt;/li&gt;
  &lt;li&gt;Поиск кратчайшего пути в графе&lt;/li&gt;
&lt;/ol&gt;
&lt;h2&gt;Пример кода алгоритма&lt;/h2&gt;
&lt;pre&gt;
// Алгоритм поиска максимального числа в массиве (JavaScript)
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i &lt; arr.length; i++) {
    if (arr[i] &gt; max) {
      max = arr[i];
    }
  }
  return max;
}
&lt;/pre&gt;
&lt;h2&gt;Заключение&lt;/h2&gt;
&lt;p&gt;Алгоритмы окружают нас повсюду. Понимание принципов их работы помогает лучше решать задачи и эффективнее учиться программированию.&lt;/p&gt;</pre>
    <h1>Как это будет выглядеть на сайте:</h1>
    <div class="show">
<h2>Что такое алгоритм?</h2>
<p>Алгоритм — это последовательность шагов, которые нужно выполнить, чтобы достичь определённой цели или решить задачу. Простыми словами — это инструкция.</p>
<h2>Примеры алгоритмов в повседневной жизни</h2>
<ul>
  <li>Рецепт приготовления блюда</li>
  <li>Пошаговое руководство по сборке мебели</li>
  <li>Маршрут, построенный навигатором</li>
</ul>
<h2>Примеры алгоритмов в программировании</h2>
<p>В информатике алгоритмы играют ключевую роль. Вот несколько известных примеров:</p>
<ol>
  <li>Сортировка чисел по возрастанию</li>
  <li>Поиск наибольшего элемента в массиве</li>
  <li>Поиск кратчайшего пути в графе</li>
</ol>
<h2>Пример кода алгоритма</h2>
<pre>
// Алгоритм поиска максимального числа в массиве (JavaScript)
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i &lt; arr.length; i++) {
    if (arr[i] &gt; max) {
      max = arr[i];
    }
  }
  return max;
}
</pre>

<h2>Заключение</h2>
<p>Алгоритмы окружают нас повсюду. Понимание принципов их работы помогает лучше решать задачи и эффективнее учиться программированию.</p>
    </div>
  </section>
</template>

<script>
export default {
    name: "RulesHTML",
    mounted() {
      const el = this.$el
      el.scrollIntoView()
  }
}
</script>

<style scoped>
#rules {
  width: 70%;
  margin-left: 15%;
  background-color: rgba(230, 230, 230, 0.7);
  backdrop-filter: blur(6px);
}

h1 {
  text-align: center;
  padding: 15px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
}

h2 {
  padding: 15px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
  word-break: break-word;
  hyphens: auto;
}

p {
  font-size: 20px;
  padding: 0 30px 20px;
  text-align: justify;
  word-break: break-word;
  hyphens: auto;
}

pre {
  display: inline-block;
  margin: 0px 30px;
  font-size: 20px;
  padding: 10px;
  background-color: rgba(230, 230, 230, 0.7);
  border: 1px solid black;
  border-radius: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: auto;
}

ul, ol {
  padding: 0px 30px 20px 50px;
  font-size: 20px;
}

pre {
  display: inline-block;
  margin: 0px 30px;
  font-size: 20px;
  padding: 10px;
  background-color: rgba(230, 230, 230, 0.7);
  border: 1px solid black;
  border-radius: 10px;
}

@media (max-width: 768px) {
  #rules {
    width: 100%;
    margin: 0;
  }

  h1 {
    padding: 12px;
    font-size: 24px;
  }

  h2 {
    padding: 12px;
    font-size: 20px;
  }

  p {
    font-size: 18px;
    padding: 0 24px 10px;
  }

  ul, ol {
    padding: 0px 22px 12px 42px;
    font-size: 18px;
  }

  pre {
    display: inline-block;
    margin: 0px 20px;
    font-size: 18px;
    padding: 6px;
  }
}

@media (max-width: 425px) {
  h1 {
    padding: 9px;
    font-size: 20px;
  }

  h2 {
    padding: 8px;
    font-size: 16px;
  }

  p {
    font-size: 14px;
    padding: 0 18px 8px;
  }

  ul, ol {
    padding: 0px 16px 9px 36px;
    font-size: 14px;
  }

  pre {
    display: inline-block;
    margin: 0px 16px;
    font-size: 14px;
    padding: 5px;
  }
}
</style>