<?php

namespace AppBundle\Controller;

use AppBundle\Form\SearchType;
use AppBundle\Form\TimeType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends BaseController
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findAllSorted('BiH', $this->getNumberOfArticles(), $this->getFilterDate());

        return $this->render('default/index.html.twig', [
            'items' => $items
        ]);
    }

    /**
     * @Route("/izvor/{source}", name="source")
     */
    public function sourceAction(Request $request, $source)
    {
        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findBySource($source, $this->getNumberOfArticles(), $this->getFilterDate());

        return $this->render('default/index.html.twig', [
            'items' => $items,
            'date' => $this->getFilterDate()
        ]);
    }

    public function searchFormAction()
    {
        $form = $this->createForm(new SearchType(),
            array(
                'action' => $this->generateUrl('search'),
                'method' => 'POST',
            )
        );

        return $this->render('search/_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/pretraga", name="search")
     * @Method({"GET", "POST"})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function searchAction(Request $request)
    {
        $form = $this->createForm(new SearchType(),
            array(
                'action' => $this->generateUrl('search'),
                'method' => 'POST',
            ));

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $data = $form->getData();
            $search = $data['title'];
            $request->getSession()->set('_search', $search);

            $items = $this->get('doctrine_mongodb')
                ->getRepository('AppBundle:Article')
                ->findByTitle($this->getSearchQuery(), $this->getNumberOfArticles(), $this->getFilterDate());

            return $this->render('default/search.html.twig', [
                'items' => $items,
                'search' => $search
            ]);
        }

        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findByTitle($this->getSearchQuery(), $this->getNumberOfArticles(), $this->getFilterDate());

        return $this->render('default/search.html.twig', [
            'items' => $items,
            'search' => $this->getSearchQuery()
        ]);
    }

    public function dateFormAction()
    {
        $form = $this->createForm(new TimeType(),
            array(
                'action' => $this->generateUrl('date'),
                'method' => 'POST',
            )
        );

        return $this->render('search/_date.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/postavke/{no}", name="number_of_articles")
     */
    public function numberOfArticlesAction(Request $request, $no)
    {
        $request->getSession()->set('_article_no', $no);

        $referer = $request->headers->get('referer');

        if (empty($referer)) {
            throw $this->createNotFoundException('referer_not_found');
        }

        return $this->redirect($referer);
    }

    /**
     * @Route("/vremeplov", name="date")
     * @Method({"POST"})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function dateAction(Request $request)
    {
        $form = $this->createForm(new TimeType())
            ->add('submit', SubmitType::class)
            ->add('reset', SubmitType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if($form->get('reset')->isClicked()) {
                $request->getSession()->set('_date', null);
            } else {
                $data = $form->getData();
                $date = $data['date'];

                if ($date) {
                    $request->getSession()->set('_date', $date);
                }
            }

        }

        $referer = $request->headers->get('referer');

        if (empty($referer)) {
            throw $this->createNotFoundException('referer_not_found');
        }

        return $this->redirect($referer);
    }
}
