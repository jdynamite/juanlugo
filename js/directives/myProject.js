juanApp.directive('myProject', function() {
  return {
    template: 'name: {{ project.name }} media: {{ project.media }} url: {{ project.url }}'
  };
});