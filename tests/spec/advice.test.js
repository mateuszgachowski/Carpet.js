/* global describe:false, it:false, expect:false */
(function (window, document, undefined) {
  'use strict';

  describe('Carpet.js: Advice methods should be working', function () {
    it('Carpet.advice is defined', function () {
      expect(window.Carpet.advice).toBeDefined();
    });

    it('advice should be an object with correct methods', function () {
      expect(typeof window.Carpet.advice).toBe('object');
      expect(typeof window.Carpet.advice.around).toBe('function');
      expect(typeof window.Carpet.advice.before).toBe('function');
      expect(typeof window.Carpet.advice.after).toBe('function');
      expect(typeof window.Carpet.advice.withAdvice).toBe('function');
    });

    it('advice.before should call the "before" function before the base function and return the base function', function () {
      var test1 = '';

      function base(arg) {
        test1 += 'Base: ' + arg;
        return 'base';
      }

      var advised = Carpet.advice.before(base, function (arg) {
        test1 += 'Before: ' + arg + ', ';
        return 'before';
      });

      expect(advised('Dan')).toBe('base');
      expect(test1).toBe('Before: Dan, Base: Dan');
    });

    it('advice.after should call the "after" function after the base function, but return the base function', function () {
      var test1 = '';

      function base(arg) {
        test1 += 'Base: ' + arg;
        return 'base';
      }

      var advised = Carpet.advice.after(base, function (arg) {
        test1 += ', After: ' + arg;
        return 'after';
      });

      expect(advised('Dan')).toBe('base');
      expect(test1).toBe('Base: Dan, After: Dan');
    });


    it('advice.around should wrap the the first "around" argument with the second argument', function () {
      var test1 = '';

      function base(arg) {
        test1 += 'Base: ' + arg;
        return 'base';
      }

      var advised = Carpet.advice.around(base, function (orig, arg) {
        test1 += '|';
        orig(arg);
        test1 += '|';
        return 'around';
      });

      expect(advised('Dan')).toBe('around');
      expect(test1).toBe('|Base: Dan|');
    });

    it('advice.withAdvice should add "before", "after" and "around" to an object', function () {
      var subject = {
        testa: '',
        testb: '',
        testc: '',
        a: function () {
          this.testa += 'A!';
        },
        b: function () {
          this.testb += 'B!';
        },
        c: function () {
          this.testc += 'C!';
        }
      };

      Carpet.advice.withAdvice.call(subject);

      subject.before('a', function () {
        this.testa += 'BEFORE!';
      });

      subject.after('b', function () {
        this.testb += 'AFTER!';
      });

      subject.around('c', function (orig) {
        this.testc += '|';
        orig.call(subject);
        this.testc += '|';
      });

      subject.a();
      expect(subject.testa).toBe('BEFORE!A!');

      subject.b();
      expect(subject.testb).toBe('B!AFTER!');

      subject.c();
      expect(subject.testc).toBe('|C!|');
    });
  });
})(this, this.document);
